import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, Express } from 'express';
import path from 'path';

const app: Express = express();

// body parser
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-parser to parse cookies
app.use(cookieParser());

// file retrieve
app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));

// // router
// app.use('/api/v1', router);

// live response
app.get('/', (req: Request, res: Response) => {
  res
    .status(201)
    .json({
      message: 'Welcome to Scale Backend!',
      status: 'success',
      timestamp: new Date().toISOString()
    });
});

export default app;
