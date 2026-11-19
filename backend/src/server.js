// Backend server entry point
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from frontend public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API endpoints would go here
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});