const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`it is a ${req.method} request to ${req.originalUrl}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
}
