import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../database/database';

export interface Receivables {
	reference: string;
	currencyCode: string;
	issueDate: string;
	openingValue: number;
	paidValue: number;
	dueDate: string;
	closedDate?: string;
	cancelled?: boolean;
	debtorName: string;
	debtorReference: string;
	debtorAddress1?: string;
	debtorAddress2?: string;
	debtorTown?: string;
	debtorState?: string;
	debtorZip?: string;
	debtorCountryCode: string;
	debtorRegistrationNumber?: string;
}

export interface ReceivablesSummary {
	totalOpen: number;
	totalClosed: number;
	totalCancelled: number;
	openPaid: number;
	closedPaid: number;
	cancelledPaid: number;
	openOutstanding: number;
	closedOutstanding: number;
	cancelledTotal: number;
}

export interface ReceivablesModel extends Receivables, Model<InferAttributes<ReceivablesModel>, InferCreationAttributes<ReceivablesModel>> {
	reference: string;
	currencyCode: string;
	issueDate: string;
	openingValue: number;
	paidValue: number;
	dueDate: string;
	closedDate?: string;
	cancelled?: boolean;
	debtorName: string;
	debtorReference: string;
	debtorAddress1?: string;
	debtorAddress2?: string;
	debtorTown?: string;
	debtorState?: string;
	debtorZip?: string;
	debtorCountryCode: string;
	debtorRegistrationNumber?: string;
}

export const ReceivablesModel = sequelize.define<ReceivablesModel>('Receivables', {
	reference: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	currencyCode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	issueDate: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	openingValue: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	paidValue: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	dueDate: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	closedDate: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	cancelled: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
	debtorName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	debtorReference: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	debtorAddress1: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	debtorAddress2: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	debtorTown: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	debtorState: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	debtorZip: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	debtorCountryCode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	debtorRegistrationNumber: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

export default ReceivablesModel;
