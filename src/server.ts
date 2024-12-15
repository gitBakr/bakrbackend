import express, { Request, Response, NextFunction, Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


// Routes imports
import travelPackageRoutes from './routes/travelPackageRoutes';
import bookingRoutes from './routes/bookingRoutes';
import userRoutes from './routes/userRoutes';
import healthRoutes from './routes/healthRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration MongoDB avec options de connexion
const mongoOptions = {
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
} as mongoose.ConnectOptions;

// Fonction de connexion à MongoDB
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, mongoOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Écouteurs d'événements MongoDB
    mongoose.connection.on('error', (err) => {
      console.error('Erreur MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Déconnecté de MongoDB');
    });

    mongoose.connection.on('reconnected', () => {
      console.info('Reconnecté à MongoDB');
    });

  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
}

// Routes
app.use('/api/travel-packages', travelPackageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);

// Variables d'environnement (version sécurisée)
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', 'Connected');
console.log('JWT_SECRET:', 'Configured');
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// Démarrage du serveur
const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI;

// Ajoutez une route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Bakr API is running'
    });
});

// Connexion à la DB puis démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
});