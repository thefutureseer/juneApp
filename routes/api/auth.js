const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//@route GET api/users
//@discription test route
//@access private
router.get('/', auth, (req, res) => res.send('Auth route'));



module.exports = router;