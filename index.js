const express = require('express');
// const mysql= require('mysql'); // Require the mysql package
const { createPool } = require('mysql2'); // Use mysql2
const app = express();
const port = 3000;
const cors = require('cors');

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json());

// Create a MySQL database connection
const pool = createPool({
    host: 'localhost', // Replace with your database host
    user: 'root', // Replace with your database user
    password: '@Mehul7488130026', // Replace with your database password
    database: 'nuego_db', // Replace with your database name
    connectionLimit:10,
  });

app.get('/api/bus-schedules', (req, res) => {
    const { departure, destination } = req.query;
  
    // Validate the input parameters
    if (!departure || !destination) {
      return res.status(400).json({ error: 'Departure and destination are required.' });
    }
  
    const query = `
      SELECT *
      FROM bus_schedule
      WHERE origin_city = ? AND destination_city = ?;
    `;
  
    pool.query(query, [departure, destination], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      return res.json(result);
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});