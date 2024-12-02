import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import restaurantRouter from './router/restaurant.Routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

app.use("/api/v1/restaurant",restaurantRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
