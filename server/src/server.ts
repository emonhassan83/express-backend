// server/src/server.ts
import { config, connectDB, disconnectDB } from '@scale/common';
import express from 'express';
import { createServer, Server } from 'http';
import app from './app';

const PORT = Number(config.port);
const server: Server = createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');
    
    server.listen(PORT, config.ip as string, () => {
      console.log(`🚀 Server running on http://${config.ip}:${PORT}`);
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