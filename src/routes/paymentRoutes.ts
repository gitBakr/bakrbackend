import express from 'express';
import { protect } from '../middleware/auth';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(paymentController.initializePayment)
  .get(paymentController.getPayments);

router.route('/:paymentId')
  .patch(paymentController.updatePayment);

export default router; 