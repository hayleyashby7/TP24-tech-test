import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Load environment variables
config({ path: '.env' });

// Initialise express
export const app = express();

// Set cors
app.use(cors());

// Set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Developer logging
if (process.env.NODE_ENV === 'development') {
	console.log('Running in development mode');
	app.use(morgan('dev'));
}

// Set routes
app.get('/', (req, res) => {
	res.send('TP24 Tech Test API');
});

export default app;
