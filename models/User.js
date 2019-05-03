const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  team: {
   type: String,
   required: false
  },
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
   type: String,
   required: false
  },
  game: {
   type: String,
   required: false
  },
  location: {
   type: String,
   required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);