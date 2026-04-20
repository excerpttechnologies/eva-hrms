// src/server.ts
import app from './app';
import { logger } from '@utils/logger';
import { config } from '@config/environment';
import { connectDatabase } from '@database/connection';

const PORT = config.PORT || 5000;
const NODE_ENV = config.NODE_ENV || 'development';

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

export default app;
