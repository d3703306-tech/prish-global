const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'IT-Corp-Test-Service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Ping endpoint for connectivity test
app.get('/api/ping', (req, res) => {
  res.json({
    message: 'pong',
    from: 'test-service',
    to: req.ip,
    protocol: 'HTTP/1.1'
  });
});

// Database status (SQLite simulation)
app.get('/api/db/status', (req, res) => {
  res.json({
    database: 'SQLite3',
    version: '3.51.2',
    status: 'connected',
    tables: ['users', 'jobs', 'resumes']
  });
});

// Mobile handshake endpoint
app.post('/api/mobile/handshake', (req, res) => {
  const { device, platform, status } = req.body;
  res.json({
    handshake: 'success',
    device: device || 'unknown',
    platform: platform || 'iOS',
    message: 'API-Mobile connection established',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🟢 IT Corp Test Service running on port ${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/ping`);
  console.log(`   GET  /api/db/status`);
  console.log(`   POST /api/mobile/handshake`);
});
