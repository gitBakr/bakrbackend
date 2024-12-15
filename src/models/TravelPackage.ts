import mongoose, { Document, Schema } from 'mongoose';

export interface ITravelPackage extends Document {
  frontTitle: string;
  frontDescription?: string;
  backTitle?: string;
  backDescription?: string;
  price: number;
  badge?: string;
  type: 'hajj' | 'omra';
  name?: string;
  date: Date;
  category: 'standard' | 'confort' | 'premium';
  availableSpots: number;
}

const travelPackageSchema = new Schema({
  frontTitle: {
    type: String,
    required: true
  },
  frontDescription: String,
  backTitle: String,
  backDescription: String,
  price: {
    type: Number,
    required: true
  },
  badge: String,
  type: {
    type: String,
    enum: ['hajj', 'omra'],
    required: true
  },
  name: String,
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['standard', 'confort', 'premium'],
    required: true
  },
  availableSpots: {
    type: Number,
    default: 50
  }
}, { timestamps: true });

export default mongoose.model<ITravelPackage>('TravelPackage', travelPackageSchema);