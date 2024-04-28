// db.ts
import mongoose from 'mongoose';
require('dotenv').config();

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URL ? process.env.MONGODB_URL : '';

// Function to connect to MongoDB
export const connectDB = async () => {
	mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err: Error) => {
		console.error('Error connecting to MongoDB:', err.message);
	});
};

export default mongoose; // Export mongoose instance for use in other files
