import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();
// Force public DNS resolvers so SRV/TXT lookups for MongoDB Atlas don't time out on the default resolver
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  const { DB_URL } = process.env;
  if (!DB_URL) {
    throw new Error('DB_URL is not set in the environment');
  }

  try {
    await mongoose.connect(DB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('MongoDB connection failed:', message);
    process.exit(1);
  }
};

export default connectDB;
