const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  validateUserId,
  validatePost,
  validateUser,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res, next) => {
  Users.get()
    .then(() => {
      res.status(200).json(req.users);
    })
    .catch(next);
});

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: `User not found`,
        });
      }
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.users);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  Posts.insert({ user_id: req.params.id, ...req.body })
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

module.exports = router;
