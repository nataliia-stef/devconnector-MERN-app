const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const prependHttp = require('prepend-http');

//load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
      .populate('user', ['name', 'avatar'])
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

//@route   GET api/profile/all
//@desc    Get all profiles
//@acess   Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.nonprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: 'There are no profiles' });
    });
});

//@route   GET api/profile/handle/:handle
//@desc    Get profile by handle
//@acess   Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};
  //get the user that is currently logged in
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//@route   GET api/profile/user/:user_id
//@desc    Get profile by user id
//@acess   Public

router.get('/user/:user_id', (req, res) => {
  const error = {};
  //req.params will contain user_id taken from the url
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => {
      res.status(404).json({ profile: 'There is no profile for this user' });
    });
});

//@route   POST api/profile
//@desc    Create or edit user profile
//@acess   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any errors
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    req.body.handle
      ? (profileFields.handle = req.body.handle)
      : (profileFields.handle = '');
    req.body.company
      ? (profileFields.company = req.body.company)
      : (profileFields.company = '');
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills
        .split(',')
        .map(skill => skill.trim())
        .filter((value, index, array) => array.indexOf(value) === index);
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube)
      profileFields.social.youtube = prependHttp(req.body.youtube, {
        https: true
      });
    if (req.body.twitter)
      profileFields.social.twitter = prependHttp(req.body.twitter, {
        https: true
      });
    if (req.body.facebook)
      profileFields.social.facebook = prependHttp(req.body.facebook, {
        https: true
      });
    if (req.body.linkedin)
      profileFields.social.linkedin = prependHttp(req.body.linkedin, {
        https: true
      });
    if (req.body.instagram)
      profileFields.social.instagram = prependHttp(req.body.instagram, {
        https: true
      });

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route   POST api/profile/experience
//@desc    Add experience to profile
//@acess   Private

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to experience to the array and return the new profile
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route   POST api/profile/education
//@desc    Add education to profile
//@acess   Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation
    if (!isValid) {
      //return any errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to the education array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route   DELETE api/profile/experience/:id
//@desc    Delete experience from profile
//@acess   Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   DELETE api/profile/education/:id
//@desc    Delete education from profile
//@acess   Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   DELETE api/profile
//@desc    Delete user and profile
//@acess   Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
