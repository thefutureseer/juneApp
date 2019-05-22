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
      ['name']
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
  [auth, [
    check('name', 'name required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      instagram
    } = req.body;

// Build profile object/ fields. knows this from token
    const profileFields = {};
    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
//console.log(profileFields);

//build social object
    profileFields.social = {}
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile) {
//Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields }, 
          { new: true }
        );

        return res.json(profile);
  
      } 
// Create
      profile = new Profile(profileFields);
//console.log(profile);
      await profile.save();
      res.json(profile);

    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error for create');
      }
  }
);

//rout: GET api/profile
//description: Get all profiles
//access: public
router.get('/', async (req, res) => {
 try {
   const profiles = await Profile.find().populate('user', ['name', 'email', 'note']);
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
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email']);
    if(!profile) return res.status(400).json({ msg: 'Profile not found'});
    res.json(profile);
  } catch (err) {
    console.error(err.message);
     if(err.kind == 'ObjectId') {
       return res.status(400).json({ msg: 'Profile not found'});
     }
    res.status(500).send('Server error');
  }
 });
 
//rout: DELETE api/profile
//description: Delete profile, user and posts too
//access: private
router.delete('/', auth, async (req, res) => {
  try {
//@todo -  remove users posts

//Remove profile   
    await Profile.findOneAndRemove({ user: req.user.id });
//Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User and Profile deleted'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
 });

// @route PUT api/profile/game
// @description add a game
// @ private
router.put('/game', 
 auth, 
async (req, res) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 const {
  day,
  hole,
  score,
  note
 } = req.body;
 const newGame = {
   day,
   hole,
   score,
   note
 };
 
 try {
   const profile = await Profile.findOne({ user: req.user.id });

   profile.game.unshift(newGame);

   await profile.save();

   res.json(profile);
 } catch (err) {
   console.error(err.message);
   res.status(500).send('Server error');
 }
});

//@Route DELETE api/profile/game/:gme_id
//@Description delete game from profile
//@access Private
router.delete('/game/:gme_id', auth, async (req, res) => {
  try {
   const profile = await Profile.findOne({ user: req.user.id });

//get remove index
   const removeIndex = profile.game
    .map(item => item.id)
    .indexOf(req.params.gme_id);

   profile.game.splice(removeIndex, 1);

   await profile.save();

   res.json(profile);

  } catch (err) {
    console.error(err.message);
     res.status(500).send('server error');

  }
});

module.exports = router;