// server/src/server.ts
import { connectDB, disconnectDB } from '@scale/common';
import express from 'express';
import { createServer, Server } from 'http';
import app from './app';

const PORT =  5000;

const server: Server = createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start:', error);
  }
};

startServer();

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});