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
 date: {
   type: Date,
   default: Date.now
 }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);