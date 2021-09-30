const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validatePost, validateUser } = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  Users.get()
    .then(() => {
      res.status(200).json(req.users)
    })
    .catch(next)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put('/:id', validateUser, validatePost, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Post is gone` });
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const postInfo = { ...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(next);
});

module.exports = router;
