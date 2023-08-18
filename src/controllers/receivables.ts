import { Request, Response, NextFunction } from 'express';
import ReceivablesService from '../services/receivables';

export const addReceivable = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.body === undefined || req.body === null || Object.keys(req.body).length === 0) throw new Error('Empty request body');

		const reference = await ReceivablesService.addReceivable(req.body);

		res.status(201).json({ message: `Receivable created for reference ${reference}` });
	} catch (error) {
		if (error instanceof Error) {
			const err = new Error(error.message);
			switch (err.message) {
				case 'Empty request body':
					return res.status(400).json({ message: 'No receivable data provided' });
				case 'Validation error':
					if (error.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ message: 'Receivable reference already exists' });
					else return res.status(400).json({ message: 'Invalid receivable data provided' });
				default:
					return res.status(500).json({ message: 'An unknown error occurred' });
			}
		} else next(error);
	}
};

export const getReceivablesSummary = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const summary = await ReceivablesService.getSummary();

		if (summary === undefined) throw new Error('No summary data');

		res.status(200).json(summary);
	} catch (error) {
		if (error instanceof Error) {
			const err = new Error(error.message);
			switch (err.message) {
				case 'No summary data':
					return res.status(404).json({ message: 'No receivables data found' });
				default:
					return res.status(500).json({ message: 'An unknown error occurred' });
			}
		} else next(error);
	}
};
