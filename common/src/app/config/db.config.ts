// common/src/config/db.config.ts
import mongoose from 'mongoose';
import { config } from './env.config.js';

const MONGODB_URI = config.database.primaryUri!;
const MONGODB_READ_URI = config.database.readUri;

let primaryConnection: mongoose.Connection | null = null;
let readConnection: mongoose.Connection | null = null;

export const connectDB = async () => {
  try {
    // Primary Connection (Write)
    primaryConnection = await mongoose.createConnection(MONGODB_URI, {
      dbName: 'scale',
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    console.log('✅ Connected to MongoDB Primary (Write)');

    // Read Replica Connection
    if (MONGODB_READ_URI) {
      readConnection = await mongoose.createConnection(MONGODB_READ_URI, {
        dbName: 'scale',
        maxPoolSize: 20,
        minPoolSize: 5,
        readPreference: 'secondaryPreferred',
      });
      console.log('✅ Connected to MongoDB Read Replica');
    }

    return { primaryConnection, readConnection };
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    throw error;
  }
};

export const getPrimaryConnection = () => {
  if (!primaryConnection) {
    throw new Error('Primary connection not initialized. Call connectDB() first.');
  }
  return primaryConnection;
};

export const getReadConnection = () => {
  if (!readConnection) {
    throw new Error('Read connection not initialized. Call connectDB() first.');
  }
  return readConnection;
};

// Graceful shutdown
export const disconnectDB = async () => {
  if (primaryConnection) {
    await primaryConnection.close();
    console.log('🔌 Primary connection closed');
  }
  if (readConnection) {
    await readConnection.close();
    console.log('🔌 Read connection closed');
  }
};