import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Définition du type pour les états de connexion
type ConnectionState = 0 | 1 | 2 | 3;

// Type pour l'objet states
const states: Record<ConnectionState, string> = {
    0: 'déconnecté',
    1: 'connecté',
    2: 'en cours de connexion',
    3: 'en cours de déconnexion'
};

// Test basique du serveur
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date(),
        environment: process.env.NODE_ENV
    });
});

// Test de la connexion à la base de données
router.get('/db', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState as ConnectionState;
        
        res.status(200).json({
            status: 'success',
            database: {
                state: states[dbState],
                host: mongoose.connection.host,
                name: mongoose.connection.name
            }
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur lors de la vérification de la base de données',
            error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
        });
    }
});

export default router; 