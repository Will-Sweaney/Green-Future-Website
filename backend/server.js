const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gf-user-creds',
  password: 'thEro0t34',
  port: 5432,
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const userCheckResult = await pool.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const newUser = await pool.query(insertUserQuery, [username, email, password]);

    return res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ success: false, message: 'Error registering user.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});