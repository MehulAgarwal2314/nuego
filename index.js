const express = require('express');
// const mysql= require('mysql'); // Require the mysql package
const { createPool } = require('mysql2'); // Use mysql2
const app = express();
const port = process.env.PORT||3000;
const cors = require('cors');

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json());

// Create a MySQL database connection
const pool = createPool({
    // host: 'localhost', // Replace with your database host
    host:'us-cdbr-east-06.cleardb.net',
    user: 'b3f07c73b6fcde', // Replace with your database user
    password: 'c1e4a7a3', // Replace with your database password
    database: 'heroku_cc9c31584bb6343', // Replace with your database name
    connectionLimit:10,
  });

app.get('/', (req, res) => {
    const { departure, destination } = req.query;
  
    // Validate the input parameters
    if (!departure || !destination) {
      return res.status(400).json({ error: 'Departure and destination are required.' });
    }
  
    const query = `
      SELECT *
      FROM new_table
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
