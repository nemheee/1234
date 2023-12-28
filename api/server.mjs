import { tools } from './tools.mjs';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.get('/tools', async (req, res) => {
  await tools.getTools(req, res);
});

app.use('/tools', express.static(path.join(__dirname, 'pheonix-web')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  