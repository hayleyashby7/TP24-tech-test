import { Receivables, ReceivablesModel, ReceivablesSummary } from '../models/receivables';
import { QueryTypes } from 'sequelize';
import sequelize from '../database/database';

export const ReceivablesService = {
	addReceivable: async (receivable: Receivables): Promise<string> => {
		try {
			const newReceivable = await ReceivablesModel.create(receivable);
			return newReceivable.reference;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	getSummary: async (): Promise<ReceivablesSummary> => {
		try {
			const sql = `SELECT
		SUM(CASE WHEN closedDate IS NULL AND cancelled IS NOT TRUE THEN 1 ELSE 0 END) AS totalOpen,
		SUM(CASE WHEN closedDate IS NOT NULL AND cancelled IS NOT TRUE THEN 1 ELSE 0 END) AS totalClosed,
		SUM(CASE WHEN cancelled IS TRUE THEN 1 ELSE 0 END) AS totalCancelled,
		ROUND(SUM(CASE WHEN closedDate IS NULL AND cancelled IS NOT TRUE THEN paidValue ELSE 0 END),2) AS openPaid,
		ROUND(SUM(CASE WHEN closedDate IS NOT NULL AND cancelled IS NOT TRUE THEN paidValue ELSE 0 END),2) AS closedPaid,
		ROUND(SUM(CASE WHEN cancelled IS TRUE THEN paidValue ELSE 0 END),2) AS cancelledPaid,
		ROUND(SUM(CASE WHEN closedDate IS NULL AND cancelled IS NOT TRUE THEN (openingValue-paidValue) ELSE 0 END),2) AS openOutstanding,
		ROUND(SUM(CASE WHEN closedDate IS NOT NULL AND cancelled IS NOT TRUE THEN (openingValue-paidValue) ELSE 0 END),2) AS closedOutstanding,
		ROUND(SUM(CASE WHEN cancelled IS TRUE THEN (openingValue-paidValue) ELSE 0 END),2) AS cancelledTotal
		FROM Receivables`;

			const summary = await sequelize.query(sql, { type: QueryTypes.SELECT, raw: true });

			if (summary === undefined || summary === null || summary.length === 0) throw new Error('No summary data');

			return summary[0] as ReceivablesSummary;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

export default ReceivablesService;
