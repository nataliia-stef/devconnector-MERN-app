const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load Profile Model
const Profile = require('../../models/Profile');

//load User Model
const User = require('../../models/User');

//@route   GET api/profile/test
//@desc    Test profile route
//@acess   Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works!' }));

//@route   GET api/profile
//@desc    GET current user profile
//@acess   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.nonprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json();
      });
  }
);

module.exports = router;
