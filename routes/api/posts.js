const express = require('express');
const router = express.Router();

//@route GET api/users
//@discription test route
//@access public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;