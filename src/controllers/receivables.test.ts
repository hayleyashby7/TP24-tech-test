import request from 'supertest';
import app from '../app';
import ReceivablesService from '../services/receivables';

jest.mock('../services/receivables');

beforeAll(async () => {
	jest.resetAllMocks();
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('POST /receivables', () => {
	describe('when given a valid request body', () => {
		test('should respond with 201 status code', async () => {
			// Arrange
			const requestBody = {
				reference: 'INV-006',
				currencyCode: 'GBP',
				issueDate: '2023-02-01',
				openingValue: 500.0,
				paidValue: 500.0,
				dueDate: '2020-09-31',
				debtorName: 'Hamilton Corp',
				debtorReference: 'ABC456',
				debtorAddress1: '187 No Where Avenue',
				debtorAddress2: 'Pretend District',
				debtorTown: 'Fakeville',
				debtorState: 'Fakeshire',
				debtorCountryCode: 'GB',
				debtorRegistrationNumber: '9876654456',
			};
			ReceivablesService.addReceivable = jest.fn().mockResolvedValue(requestBody.reference);

			// Act
			const response = await request(app).post('/api/receivables').send(requestBody);

			// Assert
			expect(response.status).toBe(201);
		});

		test('should respond with a confirmation message containing the reference', async () => {
			// Arrange
			const requestBody = {
				reference: 'INV-007',
				currencyCode: 'GBP',
				issueDate: '2023-02-01',
				openingValue: 500.0,
				paidValue: 500.0,
				dueDate: '2020-09-31',
				debtorName: 'Hamilton Corp',
				debtorReference: 'ABC456',
				debtorAddress1: '187 No Where Avenue',
				debtorAddress2: 'Pretend District',
				debtorTown: 'Fakeville',
				debtorState: 'Fakeshire',
				debtorCountryCode: 'GB',
				debtorRegistrationNumber: '9876654456',
			};
			ReceivablesService.addReceivable = jest.fn().mockResolvedValue(requestBody.reference);

			// Act
			const response = await request(app).post('/api/receivables').send(requestBody);

			// Assert
			expect(response.body.message).toContain(requestBody.reference);
		});

		test('should call ReceivablesService.addReceivable with the request body', async () => {
			// Arrange
			const requestBody = {
				reference: 'INV-008',
				currencyCode: 'GBP',
				issueDate: '2023-02-01',
				openingValue: 500.0,
				paidValue: 500.0,
				dueDate: '2020-09-31',
				debtorName: 'Hamilton Corp',
				debtorReference: 'ABC456',
				debtorAddress1: '187 No Where Avenue',
				debtorAddress2: 'Pretend District',
				debtorTown: 'Fakeville',
				debtorState: 'Fakeshire',
				debtorCountryCode: 'GB',
				debtorRegistrationNumber: '9876654456',
			};
			ReceivablesService.addReceivable = jest.fn().mockResolvedValue(requestBody.reference);

			// Act
			await request(app).post('/api/receivables').send(requestBody);

			// Assert
			expect(ReceivablesService.addReceivable).toHaveBeenCalledWith(requestBody);
		});
	});

	describe('when given an invalid request body', () => {
		test('should respond with 400 status code and message if request body empty', async () => {
			// Arrange
			const requestBody = {};
			ReceivablesService.addReceivable = jest.fn().mockResolvedValue('');

			// Act
			const response = await request(app).post('/api/receivables').send(requestBody);

			// Assert
			expect(response.status).toBe(400);
			expect(response.body.message).toBe('No receivable data provided');
			expect(ReceivablesService.addReceivable).not.toHaveBeenCalled();
		});

		test('should respond with 409 status code and message if receivable document already exists', async () => {
			// Arrange
			const requestBody = {
				reference: 'INV-001',
				currencyCode: 'GBP',
				issueDate: '2023-02-01',
				openingValue: 500.0,
				paidValue: 500.0,
				dueDate: '2020-09-31',
				debtorName: 'Hamilton Corp',
				debtorReference: 'ABC456',
				debtorAddress1: '187 No Where Avenue',
				debtorAddress2: 'Pretend District',
				debtorTown: 'Fakeville',
				debtorState: 'Fakeshire',
				debtorCountryCode: 'GB',
				debtorRegistrationNumber: '9876654456',
			};
			const error = new Error('Validation error');
			error.name = 'SequelizeUniqueConstraintError';
			ReceivablesService.addReceivable = jest.fn().mockRejectedValue(error);

			// Act
			const response = await request(app).post('/api/receivables').send(requestBody);

			// Assert
			expect(response.status).toBe(409);
			expect(response.body.message).toBe('Receivable reference already exists');
		});

		test('should respond with 500 status code and message if an unknown error occurs', async () => {
			// Arrange
			const requestBody = {
				reference: 'INV-001',
				currencyCode: 'GBP',
				issueDate: '2023-02-01',
				openingValue: 500.0,
				paidValue: 500.0,
				dueDate: '2020-09-31',
				debtorName: 'Hamilton Corp',
				debtorReference: 'ABC456',
				debtorAddress1: '187 No Where Avenue',
				debtorAddress2: 'Pretend District',
				debtorTown: 'Fakeville',
				debtorState: 'Fakeshire',
				debtorCountryCode: 'GB',
				debtorRegistrationNumber: '9876654456',
			};
			ReceivablesService.addReceivable = jest.fn().mockRejectedValue(new Error('Unexpected error'));

			// Act
			const response = await request(app).post('/api/receivables').send(requestBody);
			console.log(response.body);

			// Assert
			expect(response.status).toBe(500);
			expect(response.body.message).toBe('An unknown error occurred');
		});
	});
});

describe('GET /receivables/summary', () => {
	describe('when a valid request is made', () => {
		test('should respond with 200 status code', async () => {
			// Arrange
			const summary = {
				totalReceivables: 3,
				totalValue: 1500.0,
				totalPaid: 1500.0,
				totalOutstanding: 0.0,
			};
			ReceivablesService.getSummary = jest.fn().mockResolvedValue(summary);

			// Act
			const response = await request(app).get('/api/receivables/summary');

			// Assert
			expect(response.status).toBe(200);
		});

		test('should respond with a summary object', async () => {
			// Arrange
			const summary = {
				totalReceivables: 3,
				totalValue: 1500.0,
				totalPaid: 1500.0,
				totalOutstanding: 0.0,
			};
			ReceivablesService.getSummary = jest.fn().mockResolvedValue(summary);

			// Act
			const response = await request(app).get('/api/receivables/summary');

			// Assert
			expect(response.body).toEqual(summary);
		});
		test('should call ReceivablesService.getSummary', async () => {
			// Arrange
			const summary = {
				totalReceivables: 3,
				totalValue: 1500.0,
				totalPaid: 1500.0,
				totalOutstanding: 0.0,
			};
			ReceivablesService.getSummary = jest.fn().mockResolvedValue(summary);

			// Act
			await request(app).get('/api/receivables/summary');

			// Assert
			expect(ReceivablesService.getSummary).toHaveBeenCalled();
		});
	});

	describe('when an invalid request is made', () => {
		test('should respond with 404 status code and message if no summary data found', async () => {
			// Arrange
			ReceivablesService.getSummary = jest.fn().mockResolvedValue(undefined);

			// Act
			const response = await request(app).get('/api/receivables/summary');

			// Assert
			expect(response.status).toBe(404);
			expect(response.body.message).toBe('No receivables data found');
		});

		test('should respond with 500 status code and message if an unknown error occurs', async () => {
			// Arrange
			ReceivablesService.getSummary = jest.fn().mockRejectedValue(new Error('Unexpected error'));

			// Act
			const response = await request(app).get('/api/receivables/summary');

			// Assert
			expect(response.status).toBe(500);
			expect(response.body.message).toBe('An unknown error occurred');
		});
	});
});
