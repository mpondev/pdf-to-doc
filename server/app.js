const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;
