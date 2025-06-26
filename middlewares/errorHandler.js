const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const env = process.env.NODE_ENV;

  if (env === 'development') {
    console.error('💥 ERROR 💥:', err);
  } else {
    console.error('🚨 PRODUCTION ERROR:', err.message);
  }

  res.status(statusCode).json({
    success: false,
    message:
      env === 'development'
        ? err.message
        : statusCode === 500
        ? 'Internal Server Error'
        : err.message
  });
};

module.exports = errorHandler;
