import express from 'express';
import cors from 'cors';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
app.get('/api/message', (_req, res) => res.json({ message: 'Hello from EKS backend!', version: process.env.APP_VERSION || 'local' }));
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));
