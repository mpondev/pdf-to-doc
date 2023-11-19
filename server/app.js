const express = require('express');
const cors = require('cors');
const routes = require('./routes/uploadRoutes.js');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use(routes);

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;
