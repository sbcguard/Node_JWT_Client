import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { PORT } from './secrets';
import secureMiddleware from './middleware/secure';
import { errorHandler } from './errorHandler';
import logger from './logger/logger';

const app: Express = express();
app.use(express.json());

app.use(cookieParser());

// Apply secure middleware, with error handler wrapper
app.use(errorHandler(secureMiddleware));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
