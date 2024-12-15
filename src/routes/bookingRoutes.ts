import express from 'express';
import { protect } from '../middleware/auth';
import * as bookingController from '../controllers/bookingController';
import paymentRoutes from './paymentRoutes';

const router = express.Router();

router.use(protect);

router.use('/:bookingId/payments', paymentRoutes);

router.get('/my-bookings', bookingController.getMyBookings);

router.route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.cancelBooking);

export default router;