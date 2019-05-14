const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'user'
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
 game: [ 
  {
   day: {
   type: String,
   required: true
   },
   hole: {
    type: String,
    required: true
   },
   score: {
     type: Number,
     required: true
   }
  }
 ],
 date: {
   type: Date,
   default: Date.now
 }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);