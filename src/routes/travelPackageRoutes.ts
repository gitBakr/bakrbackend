import express from 'express';
import { protect } from '../middleware/auth';
import * as travelPackageController from '../controllers/travelPackageController';

const router = express.Router();

router.get('/', travelPackageController.getAllTravelPackages);
router.get('/:id', travelPackageController.getTravelPackage);

router.use(protect);
router.post('/', travelPackageController.createTravelPackage);
router.patch('/:id', travelPackageController.updateTravelPackage);
router.delete('/:id', travelPackageController.deleteTravelPackage);

export default router;