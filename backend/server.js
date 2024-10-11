const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('green_future_db', 'root', 'thEro0t34', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('get good');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});