import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Prénom requis']
  },
  lastName: {
    type: String,
    required: [true, 'Nom requis']
  },
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe requis'],
    minlength: 8,
    select: false
  },
  phoneNumber: {
    type: String,
    required: [true, 'Numéro de téléphone requis']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model<IUser>('User', userSchema);