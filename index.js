require('dotenv').config();

// This is the Web Server
const express = require('express');
const server = express();

// Enable cross-origin resource sharing to proxy api requests
// From localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
server.use(cors());

// Create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// Handle application/json requests
server.use(express.json());

// server.get("/", (req, res, next) => {
//   res.send(`
//       <h1>Hello World root index</h1>
//   `);
// });

// Here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// Here's our API
const apiRouter = require('./api')
server.use('/api', apiRouter);

// By default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Bring in the DB connection
const client = require('./db/client');

// Connect to the server
const PORT = process.env.PORT || 4000;

// Define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

// Export server and handle for routes/*.test.js
module.exports = { server, handle };