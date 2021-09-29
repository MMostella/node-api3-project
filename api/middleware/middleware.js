const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`it is a ${req.method} request to ${req.originalUrl}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const Users = await User.getById(req.params.id)
    if (Users) {
      req.users = Users;
      next();
    } else {
      next({ status: 404, message: `User not found with matching ID` })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
  validateUserId,
}
