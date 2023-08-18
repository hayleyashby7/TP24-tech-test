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

Time Taken:

Tech Stack:
Server: Node.js Express server written in Typescript.
Testing: Jest, with Supertest support for HTTP calls.

Assumptions and decisions:


## How to run

-   Clone github repo onto local machine
-   From root folder, install packages with npm `npm install`
-   To start server `npm start`. By default the server will run on port 3000.
-   To run tests `npm run test`

## Endpoints

### Home

`GET /` - A basic home endpoint that confirms the server is running
