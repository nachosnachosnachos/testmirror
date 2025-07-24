import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');

  try {
    const target = decodeURIComponent(url);
    const response = await fetch(target);
    const content = await response.text();

    res.set('Content-Type', 'text/html');
    res.send(content);
  } catch (err) {
    res.status(500).send('Error fetching target site');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
