import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find()
      .populate('travelPackage')
      .populate('user', 'firstName lastName email');

    res.status(200).json({
      status: 'success',
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const getBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('travelPackage')
      .populate('user', 'firstName lastName email');

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Réservation non trouvée'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: newBooking
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Réservation non trouvée'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const getMyBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('travelPackage');

    res.status(200).json({
      status: 'success',
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Réservation non trouvée'
      });
      return;
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403).json({
        status: 'error',
        message: 'Non autorisé'
      });
      return;
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};