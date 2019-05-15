const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

//@route POST api/users
//@discription test route
//@access public
router.post(
  '/', 
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('password', 'password must be 8 digits or more'
    ).isLength({ min: 8 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
  }
    const {name, phone, password} = req.body;
    try {
      let user = await User.findOne({ phone });
 //see if user exists
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'user already exists'}] });
      }
  
  //get users avitar pictures NOT using yet

  user = new User({
    name,
    phone,
    password
  });

//encrypt password
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);
  
  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload, 
    config.get('jwtSecret'), 
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({token});
  });

    } catch (err) {
       console.error(err.message);
       res.status(500).send('server error');
    }
 
  }
);
   

module.exports = router;