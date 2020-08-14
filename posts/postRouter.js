const express = require('express');
const posts = require("../posts/postDb")
const { validatePostId } = require("../middleware/post");
const { getById } = require('../users/userDb');

const router = express.Router();

// Get Posts
router.get('/api/posts', (req, res, next) => {
  posts
    .get()
    .then((post) => {
        res.status(200).json(post)
    })
    .catch(next)
});

// Get Posts by Post ID
router.get('/api/posts/:id', validatePostId(),(req, res, next) => {
  posts
    .getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      }
    })
    .catch(next)
});

// Delete Post by Post ID
router.delete('/api/posts/:id', validatePostId(), (req, res, next) => {
  posts
    .remove(req.params.id)
    .then((removed) => {
      if (removed) {
        res.status(200).json({
          message: `Post ${req.params.id} has been deleted`
        })
        .catch(next)
      }
    })
});

// Edit post by ID
router.put('/api/posts/:id', validatePostId(),(req, res, next) => {
  posts
    .update(req.params.id, req.body)
    .then((updated) => {
      if (updated) {
        res.status(200).json({
          message: `Post ${req.params.id} updated successfully`,
        })
      }
    })
    .catch(next)
});


module.exports = router;
