import express, { Application } from 'express';
import { initializeRedis } from './redisClient';
import { routes } from './routes';
import { startScheduler } from './scheduler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

const redisClient = initializeRedis();

app.use(express.json());

routes(app, redisClient);

startScheduler(redisClient);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
