import request from 'supertest';
import app from './app';

describe('Test the root path', () => {
	test('GET should return 200 with expected message', async () => {
		// Arrange
		const responseMessage = 'TP24 Tech Test API';

		// Act
		const response = await request(app).get('/');

		// Assert
		expect(response.status).toBe(200);
		expect(response.text).toBe(responseMessage);
	});
});
