const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
   type: String,
   required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoos.model('user', UserSchema);