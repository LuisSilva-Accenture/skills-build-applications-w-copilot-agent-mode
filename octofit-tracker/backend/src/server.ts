import express from 'express';
import cors from 'cors';
import './config/database.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
