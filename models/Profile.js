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
 /*
 phone: {
   type: Number,
   required: true
 }, */
 email: {
   type: String,
   required: true,
 },
 
 password: {
  type: String,
  required: false
 },
 game: [ 
  {
   day: {
   type: String,
   required: true,
   unique: true
   },
   hole: {
    type: Number,
    required: true
   },
   score: {
     type: Number,
     required: true
   }, 
   note: {
    type: String,
    required: false
   }
  }
 ],

 //instagram
 date: {
   type: Date,
   default: Date.now
 }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);