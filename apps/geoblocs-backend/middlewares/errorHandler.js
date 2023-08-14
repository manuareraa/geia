// errorHandler.js
const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  res.status(err.statusCode).json({
    error: {
      name: err.name,
      message: err.message,
    },
  });
};

module.exports = errorHandler;
