import Receivables from '../models/receivables';

const receivables = [
	{
		reference: 'INV-001',
		currencyCode: 'GBP',
		issueDate: '2023-01-01',
		openingValue: 1234.56,
		paidValue: 1234.56,
		dueDate: '2023-01-31',
		closedDate: '2023-01-21',
		debtorName: 'ADA Industries',
		debtorReference: 'FakeINV1',
		debtorAddress1: '1 Fake Street',
		debtorTown: 'Fakeville',
		debtorState: 'Fakeshire',
		debtorZip: 'TE1 1ST',
		debtorCountryCode: 'GB',
		debtorRegistrationNumber: '12345678',
	},
	{
		reference: 'INV-002',
		currencyCode: 'GBP',
		issueDate: '2023-01-01',
		openingValue: 1234.56,
		paidValue: 0.0,
		dueDate: '2024-01-31',
		debtorName: 'ADA Industries',
		debtorReference: 'FakeINV2',
		debtorAddress1: '1 Fake Street',
		debtorTown: 'Fakeville',
		debtorState: 'Fakeshire',
		debtorZip: 'TE1 1ST',
		debtorCountryCode: 'GB',
		debtorRegistrationNumber: '12345678',
	},
	{
		reference: 'INV-003',
		currencyCode: 'GBP',
		issueDate: '2023-08-01',
		openingValue: 1500.01,
		paidValue: 100.0,
		dueDate: '2020-03-31',
		debtorName: 'Hamilton Corp',
		debtorReference: 'ABC123',
		debtorAddress1: '187 No Where Avenue',
		debtorAddress2: 'Pretend District',
		debtorTown: 'Fakeville',
		debtorState: 'Fakeshire',
		debtorZip: 'TE2 1ST',
		debtorCountryCode: 'GB',
		debtorRegistrationNumber: '9876654456',
	},
	{
		reference: 'INV-004',
		currencyCode: 'GBP',
		issueDate: '2023-02-01',
		openingValue: 500.0,
		paidValue: 0.0,
		dueDate: '2020-09-31',
		cancelled: true,
		debtorName: 'Hamilton Corp',
		debtorReference: 'ABC456',
		debtorAddress1: '187 No Where Avenue',
		debtorAddress2: 'Pretend District',
		debtorTown: 'Fakeville',
		debtorState: 'Fakeshire',
		debtorZip: 'TE2 1ST',
		debtorCountryCode: 'GB',
		debtorRegistrationNumber: '9876654456',
	},
];

export const intialiseDatabase = async () => {
	// Initialise the database
	await Receivables.sync({ force: true });
	console.log('Database initialised successfully.');
};

export const seedDatabase = async () => {
	// Add some dummy data to the database for development
	await Receivables.sync({ force: true });
	await Receivables.bulkCreate(receivables);
	console.log('Database seeded successfully.');
};
