const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

// START SERVER
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
