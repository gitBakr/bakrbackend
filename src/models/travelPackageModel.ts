import { Schema, model } from 'mongoose';

interface ITravelPackage {
    title: string;
    frontTitle: string;
    type: 'hajj' | 'omra';
    category: 'standard' | 'premium';
    description: string;
    price: number;
    date: Date;
    startDate: Date;
    endDate: Date;
    duration: number;
    location: string;
    maxParticipants: number;
    availableSpots: number;
    included: string[];
}

const travelPackageSchema = new Schema<ITravelPackage>({
    title: { type: String, required: true },
    frontTitle: { type: String, required: true },
    type: { 
        type: String, 
        required: true,
        enum: ['hajj', 'omra'],
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: ['standard', 'premium']
    },
    description: { 
        type: String, 
        required: true,
        select: true
    },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { 
        type: Number, 
        required: true,
        select: true
    },
    location: { 
        type: String, 
        required: true,
        select: true
    },
    maxParticipants: { type: Number, required: true },
    availableSpots: { 
        type: Number,
        default: function() {
            return this.maxParticipants;
        }
    },
    included: {
        type: [String],
        required: true,
        select: true
    }
}, {
    timestamps: true
});

// Méthode pour calculer availableSpots
travelPackageSchema.methods.calculateAvailableSpots = function(): number {
    return this.maxParticipants;
};

const TravelPackage = model<ITravelPackage>('TravelPackage', travelPackageSchema);

export default TravelPackage; 