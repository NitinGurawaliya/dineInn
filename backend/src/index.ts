import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import restaurantRouter from './router/restaurant.Routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4005;

app.use(express.json());
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Welcome to the DineInn API');
});

app.use("/api/v1/restaurant",restaurantRouter)

export default function handler(req: Request, res: Response) {
  return app(req as any, res as any);
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
