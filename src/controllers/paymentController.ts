import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Payment from '../models/Payment';

export const initializePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({
                status: 'error',
                message: 'Réservation non trouvée'
            });
        }

        const payment = await Payment.create({
            booking: booking._id,
            amount: req.body.amount,
            currency: req.body.currency,
            paymentMethod: req.body.paymentMethod,
            status: 'pending'
        });

        res.status(201).json({
            status: 'success',
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.paymentId,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payments = await Payment.find({ booking: req.params.bookingId });

        res.status(200).json({
            status: 'success',
            data: payments
        });
    } catch (error) {
        next(error);
    }
}; 