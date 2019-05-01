const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

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
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
    res.send('Users route')
  }
);
   

module.exports = router;