import { Request, Response } from 'express';
import TravelPackage from '../models/TravelPackage';

export const getAllTravelPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const travelPackages = await TravelPackage.find();
    res.status(200).json({
      status: 'success',
      data: travelPackages
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const getTravelPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const travelPackage = await TravelPackage.findById(req.params.id);
    if (!travelPackage) {
      res.status(404).json({
        status: 'error',
        message: 'Forfait de voyage non trouvé'
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: travelPackage
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const createTravelPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTravelPackage = await TravelPackage.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTravelPackage
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const updateTravelPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const travelPackage = await TravelPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!travelPackage) {
      res.status(404).json({
        status: 'error',
        message: 'Forfait de voyage non trouvé'
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: travelPackage
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const deleteTravelPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const travelPackage = await TravelPackage.findByIdAndDelete(req.params.id);
    if (!travelPackage) {
      res.status(404).json({
        status: 'error',
        message: 'Forfait de voyage non trouvé'
      });
      return;
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    });
  }
};

export const getTravelPackages = async (req: Request, res: Response) => {
    try {
        const { type, category, minPrice, maxPrice, startDate, endDate } = req.query;
        
        // Construction du filtre avec typage strict
        const filter: Record<string, any> = {};
        
        // Filtre par type avec validation
        if (type && ['hajj', 'omra'].includes(type as string)) {
            filter.type = type;
        }

        // Autres filtres...
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (startDate) filter.date = { $gte: new Date(startDate as string) };
        if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate as string) };

        // Sélection de tous les champs nécessaires
        const packages = await TravelPackage.find(filter)
            .select('title frontTitle type category description price date startDate endDate duration location maxParticipants availableSpots included')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            status: 'success',
            results: packages.length,
            data: packages
        });
    } catch (error: unknown) {
        res.status(400).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Une erreur est survenue'
        });
    }
};