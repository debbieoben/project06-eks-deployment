const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Request counter
let requestCount = 0;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Main endpoint
app.get('/', (req, res) => {
  requestCount++;
  
  const response = {
    message: 'Hello from EKS Demo App!',
    hostname: os.hostname(),
    platform: os.platform(),
    nodeVersion: process.version,
    uptime: process.uptime(),
    requestCount: requestCount,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
});

// Environment info endpoint
app.get('/env', (req, res) => {
  res.json({
    hostname: os.hostname(),
    env: process.env.APP_ENV || 'not set',
    version: process.env.APP_VERSION || '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Hostname: ${os.hostname()}`);
});