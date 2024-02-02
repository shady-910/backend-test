const logger = require('./logger');

module.exports = (app) => {
  // General "catch all" error handling
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';
    logger.error(err);

    res.status(status).json({ error: errorMessage });

    return next();
  });
};
