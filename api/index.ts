import express from 'express';
import { apiRouter } from '../server/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API router for both direct /api/* calls and rewritten paths
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
