const yup = require('yup');

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
      next({ status: 404, message: `user not found` })
    }
  } catch (err) {
    next(err)
  }
}

const userSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Name must be a string')
    .trim()
    .required('Name is required')
    .min(3, 'Name must be no less than 3 characters long')
    .max(15, 'Name must be no longer than 10 characters')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
})

async function validateUser(req, res, next) {
  try {
    const UserValidated = await userSchema.validate(req.body);
    req.body = UserValidated;
    next();
  } catch (err) {
    next({ status: 400, message: `missing required name field`})
  }
}

const postSchema = yup.object().shape({
  text: yup
    .string()
    .typeError('Name must be a string')
    .trim()
    .required('Name is required')
    .min(3, 'Name must be no less than 3 characters long')
    .max(15, 'Name must be no longer than 10 characters')
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  
  user_id: yup
    .string()
    .required('User ID is required')
})

async function validatePost(req, res, next) {
  try {
    const postValidated = await postSchema.validate(req.body);
    req.body = postValidated;
    next();
  } catch (err) {
    next({ status: 400, message: `missing required text field`})
  }
}

module.exports = {
  logger,
  validateUserId,
  validatePost,
  validateUser
}
