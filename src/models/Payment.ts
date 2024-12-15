import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ['EUR', 'USD']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['card', 'bank_transfer', 'cash']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: String
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment; 