import app from './app';
import { config } from 'dotenv';
import sequelize from './database/database';
import { seedDatabase, intialiseDatabase } from './database/databaseHelper';

// Load environment variables
config({ path: '.env' });

// Set port
const port = process.env.PORT || 3000;

// Connect to database
const connect = async () => {
	try {
		await sequelize.authenticate().then(() => intialiseDatabase());
		console.log('Connected to database successfully.');

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

if (process.env.NODE_ENV === 'development') {
	console.log('Seeding database for development mode.');
	connect().then(async () => await seedDatabase());
} else connect();



// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
