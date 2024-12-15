import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  travelPackage: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'cancelled';
  numberOfPeople: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  travelPackage: {
    type: Schema.Types.ObjectId,
    ref: 'TravelPackage',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);