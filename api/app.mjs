import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const publicPath = path.join(__dirname, 'public');

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(publicPath));

// Your existing route for getting tools data
app.get('/tools', async (req, res) => {
  // Your code to fetch tools data
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });