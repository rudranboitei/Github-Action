const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store for demo purposes
let items = [
  { id: 1, name: 'Learn GitHub Actions', completed: true },
  { id: 2, name: 'Build Express.js CI Pipeline', completed: false },
  { id: 3, name: 'Deploy to Cloud', completed: false }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Demo Express.js GitHub Actions API!',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      getItems: 'GET /api/items',
      getItemById: 'GET /api/items/:id',
      createItem: 'POST /api/items'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// Create a new item
app.post('/api/items', (req, res) => {
  const { name, completed = false } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Item name is required and must be a non-empty string'
    });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    name: name.trim(),
    completed: Boolean(completed)
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

module.exports = app;
