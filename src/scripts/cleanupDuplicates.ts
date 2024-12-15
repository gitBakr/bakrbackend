import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TravelPackage from '../models/TravelPackage';

dotenv.config();

async function cleanupDuplicates() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB');

        // Trouver les packages avec les mêmes propriétés essentielles
        const duplicates = await TravelPackage.aggregate([
            {
                $group: {
                    _id: {
                        frontTitle: "$frontTitle",
                        type: "$type",
                        date: "$date",
                        price: "$price"
                    },
                    ids: { $push: "$_id" },
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);

        // Supprimer les doublons en gardant le plus récent
        for (const dup of duplicates) {
            const [keep, ...remove] = dup.ids;
            await TravelPackage.deleteMany({ _id: { $in: remove } });
        }

        console.log(`Cleaned up ${duplicates.length} sets of duplicates`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

cleanupDuplicates(); 