const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const rankingsRouter = require('./routes/rankings');
const visaOptionsRouter = require('./routes/visaoptions');
const perksRouter = require('./routes/perks');
const registerRouter = require('./routes/register');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for requests from the frontend
app.use(cors());

// Middleware
app.use(express.json());

// Define routes
app.post('/api', apiRouter);
app.post('/login', loginRouter);
app.post('/rankings', rankingsRouter);
app.post('/visaoptions', visaOptionsRouter);
app.post('/perks', perksRouter);
app.post('/register', registerRouter);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from your Node.js backend!');
});

// for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  console.log(req.body)
  next();
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Print server address and port
server.on('listening', () => {
  const address = server.address();
  console.log(`Server is listening at ${address.address}:${address.port}`);
});
