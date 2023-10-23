const express = require('express');
const { createPool } = require('mysql2');
const app = express();
const port = process.env.PORT||3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const pool = createPool({
    host:'us-cdbr-east-06.cleardb.net',
    user: 'b3f07c73b6fcde',
    password: 'c1e4a7a3', 
    database: 'heroku_cc9c31584bb6343',
    connectionLimit:10,
  });

app.get('/', (req, res) => {
    const { departure, destination } = req.query;
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
