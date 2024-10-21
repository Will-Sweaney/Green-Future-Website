const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

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

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const newUser = await pool.query(insertUserQuery, [username, email, hashedPassword]);
    
    return res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ success: false, message: 'Error registering user.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const user = userResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Error during login.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});