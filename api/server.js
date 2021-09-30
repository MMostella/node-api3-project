const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', logger, userRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use('*', (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!`})
});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
}