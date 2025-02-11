import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(cors());


// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// Route to trigger the test case
app.post('/run-test', (req, res) => {
  // Run the test case using a child process
  exec('npm run wdio', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Test run failed: ${error.message}`);
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Test run failed with error: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);
    res.send(`Test run completed successfully: ${stdout}`);
  });
});

// Example route for checking server status
// Load tiles from JSON file
app.get('/api/tiles', (req, res) => {
  try {
    const tileData = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
    const tiles = Object.entries(tileData).map(([key, value]) => ({
      id: key,
      appName: value.appName,
      baseUrl: value.baseUrl,
      appNamespec: value.appNamespec || ''
    }));
    res.json(tiles);
  } catch (error) {
    res.status(500).json({ message: 'Error loading tile data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
