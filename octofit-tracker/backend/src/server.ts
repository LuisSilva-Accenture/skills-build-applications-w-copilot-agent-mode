import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRoutes from './routes/api.js';
import { getApiBaseUrl } from './config/baseUrl.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  const baseUrl = getApiBaseUrl(port);

  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl,
  });
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
