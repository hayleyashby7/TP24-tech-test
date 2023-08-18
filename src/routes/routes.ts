import express from 'express';
import * as receivable from '../controllers/receivables';

export const router = express.Router();

// Receivable routes
router.post('/receivables', receivable.addReceivable);
router.get('/receivables/summary', receivable.getReceivablesSummary);