const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Post Model
const Post = require('../../models/Post');

//Validation
const validatePostInput = require('../../validation/post');
//@route   GET api/posts/test
//@desc    Test post route
//@acess   Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works!' }));

//@route   POST api/posts
//@desc    Create post
//@acess   Public
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      //If any errors, send 400 with errors object
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
