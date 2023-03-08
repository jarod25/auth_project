const errorMiddleware = (error, req, res, next) => {
    console.error(error.message);
    const status = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    res.status(status).send({ error: message });
  };
  
  module.exports = errorMiddleware;