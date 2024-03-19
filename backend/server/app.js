require('dotenv').config(); 
console.log(process.env.DATABASE_URL);
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

// Initializing the pool using DATABASE_URL from the .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Additional SSL configuration 
   ssl: {
    rejectUnauthorized: false,
  //   ca: fs.readFileSync('/path/to/your/ca-cert.crt').toString(),
  }
});

const patientsRouter = require('./patientsRouters.js'); 

const app = express();
const port = process.env.PORT || 5000; // Use port from environment or fallback to 5000

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Pass the pool to the router
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use('/', patientsRouter);



// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Connection to database established on', result.rows);
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end(() => {
      console.log('Pool has ended');
    });
  });
});
