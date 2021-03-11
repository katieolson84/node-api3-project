const express = require('express');
const User = require('./users-model');
const Posts = require('../posts/posts-model');
const {validateUserId, validateUser, validatePost} =require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next);
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.users)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
  .then(users => {
    res.status(201).json(users);
  })
  .catch(next);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next);
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
  .then((deletedUser) => {
    res.status(200).json({message:"Deleted successfully", deletedUser})
  })
  .catch(next);
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Posts.get(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(next)
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const post= req.body
  Posts.insert(post)
    .then(post => {
      res.status(201).json(post)
    })
  .catch(next)
})

// do not forget to export the router
module.exports = router;