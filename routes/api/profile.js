const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@description get current users profile
//@access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user', 
      ['name', 'team']
    );

    if (!profile) {
      return res.status(400).json({ msg: "no profile for this user"});
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route POST api/profile
//@description create or update user profile
//@access private
router.post(
  '/',
  [ auth, 
  [ check('name', 'name is required')
    .not()
    .isEmpty()
  ]], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {

      team,
      name,
      score,
      email,
      password,
      game,
      location,
      notes,
      date
    } = req.body;
// Build profile fields knows this from token
    const profileFields = {};
    profileFields.user = req.user.id;
    if (team) profileFields.team = team;
    if (name)profileFields.name = name;
    if (score) profileFields.score = score;
    if (email) profileFields.email = email;
    if (password) profileFields.password = password;
    if (game) profileFields.game = game;
    if (location) profileFields.location = location;
    if (notes) profileFields.notes = notes;
    if (date) profileFields.date = date;
    try {
      let profile = await Profile.findOne({ user: req.user.id});

      if(profile) {
//Update profile
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id}, 
          {$set: profileFields}, 
          {new: true}
        );
        return res.json(profile);
      } 
// Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch(err) {
      console.error(err.message);
      res.status(500).json('server error');
    }
});

//rout: GET api/profile
//description: Get all profiles
//access: public
router.get('/', async (req, res) => {
 try {
   const profiles = await Profile.find().populate('user', ['name', 'date']);
   res.json(profiles);
 } catch (err) {
   console.error(err.message);
   res.status(500).send('Server error');
 }
});

//rout: GET api/profile/user/:user_id
//description: Get profile by user id
//access: public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'date']);
    if(!profile) return res.status(400).json({ msg: 'There is no profile for that user name'});
    res.json(profile);
  } catch (err) {
    console.error(err.message);
     if(err.kind == 'ObjectId') {
       return res.status(400).json({ msg: 'There is no profile for that user name'});
     }
    res.status(500).send('Server error');
  }
 });
 


module.exports = router;