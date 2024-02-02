require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');

const app = express();

const port = process.env.PORT || 3002;

// Express setup
require('./config/express')(app);

// Route setup
require('./routes')(app);

// General error handler
require('./config/errorHandler')(app);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});

module.exports = app;
