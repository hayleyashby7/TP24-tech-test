# TP24 Tech Test

## Brief

Write a basic set of HTTP APIs which follows best practices to provide the following capabilities:

-   Accept a payload containing receivables data (see example payload below) and store it
-   Return summary statistics about the stored receivables data; specifically the value of open and closed invoices

## Example Payload

```
[
    {
        "reference": "string",
        "currencyCode": "string",
        "issueDate": "string",
        "openingValue": 1234.56,
        "paidValue": 1234.56,
        "dueDate": "string",
        "closedDate": "string", //optional
        "cancelled": true|false, // optional
        "debtorName": "string",
        "debtorReference": "string",
        "debtorAddress1": "string", //optional
        "debtorAddress2": "string", //optional
        "debtorTown": "string", //optional
        "debtorState": "string", //optional
        "debtorZip": "string", //optional
        "debtorCountryCode": "string",
        "debtorRegistrationNumber": "string" //optional
    }
]
```

## Development Overview

### Time Taken

5 hours split over 2 short sessions - 1 hour longer than planned as I got a bit caught out by not being able to use sequelize-mock with typescript and had to rethink my testing plan.

### Tech Stack

Server: Node.js Express server written in Typescript.
Testing: Jest, with Supertest support for HTTP calls.
Data Storage: sqlite3 and sequelize

### Assumptions and decisions

-   I used an in memory SQL database with one receivables table, as it was quick and easy to implement within the timescale of this task. With more time I would have preferred to split this table into multiple smaller ones, such as a table for documents and another for debtors. In a real-world scenario though, a NO-SQL document store database (e.g. DynamoDB or MongoDB) would be a much better choice for large volumes of JSON documents - They simplify the CRUD process without needing ORMs like sequelize.
-   Testing was focussed entirely on unit tests for the controller due to time constraints. I wanted to focus on ensuring that the endpoints would respond appropriately without getting the database involved, so I mocked out the services layer.
-   I would have liked to have tested a lot more edge cases, especially around optional payload attributes. However this was reflected in the database model which was sufficient for this task.
-   The summary was generated using a handwritten SQL statement. This was done as it was quicker to get the data I wanted than trying to work around some of sequelize's syntax. The downside is that obviously it misses some of the built in safety and readability of sequelize, and was not possible to test, but I didn't have time to revist this.
-   Rather than just a total number of open and closed invoices, I wanted the summary statistics to reflect the actual paid/outstanding amounts as well as cancelled documents. I did this to provide a better overall picture of the financial health of the accounts. I assumed that this would be of value to TP24 and clients for decision making purposes.
-   I also would have liked to have implemented handling multiple receivables within the one payload as I assumed this would be likely over multiple single requests, however I was not able to include this within the time allocated.

## How to run

-   Clone github repo onto local machine
-   From root folder, install packages with npm `npm install`
-   To seed database with dummy data, set `NODE_ENV=development` inside an .env file on root, otherwise the table will be empty on start.
-   To start server `npm start` from root. By default the server will run on port 3000.
-   To run tests `npm run test` from root.

## Endpoints

### Home

`GET /` - A basic home endpoint that confirms the server is running

`POST /api/receivables` - Accepts payload of receivables data

`GET /api/receivables/summary` - Returns a summary of statistics about the stored receivables data in the following format:

```
{
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
```
