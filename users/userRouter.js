const express = require('express')
const users = require("./userDb")
const posts = require("../posts/postDb")
const { validateUser, validateUserId } = require("../middleware/user")
const { validatePost, validatePostId } = require("../middleware/post")

const router = express.Router()

// Create new user
router.post('/api/users', validateUser(), (req, res) => {
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

// Create new user post
router.post('/api/users/:id/posts', validateUserId(), validatePost(), (req, res) => {
  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error posting comment"
      })
    })
});

// Get Users
router.get('/api/users', (req, res) => {
 users
  .get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    next(error)
  })
});

// Get User by ID
router.get('/api/users/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

// Get posts by User Id
router.get('/api/users/:id/posts', validateUserId(), (req, res, next) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch(next)
});

// Delete User
router.delete('/api/users/:id', validateUserId(), (req, res, next) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been removed",
        })
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
});


router.put('/api/users/:id', validateUser(), validateUserId(), (req, res, next) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(next)
});



module.exports = router;
