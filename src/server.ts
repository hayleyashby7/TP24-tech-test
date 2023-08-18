import app from './app';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env' });

// Set port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
