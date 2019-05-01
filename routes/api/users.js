const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

//@route GET api/users
//@discription test route
//@access public
router.post(
  '/', 
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password must be 8 digits or more'
    ).isLength({ min: 8 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
  }
    const {name, score, email, password} = req.body;
    try {
      let user = await User.findOne({ email });
 //see if user exists
      if (user) {
        res.status(400).json({ errors: [{ msg: 'user already exists'}] });
      }
  
  //get users avitar pictures NOT using yet

  user = new User({
    name,
    score,
    email,
    password
  });
  //encrypt password
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);
  
  await user.save();

  //return jsonwebtoken

      res.send('Users route');
    } catch (err) {
       console.error(err.message);
       res.status(500).send('server error');
    }
 
  }
);
   

module.exports = router;