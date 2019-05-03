const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
 user = {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'user'
 },
 team: {
  type: String,
  required: false,
  unique: true
 },
 name: {
   type: String,
   required: true,
   unique: true
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
  required: false,
  unique: true
 },
 location: {
  type: String,
  required: false
 },
 notes: {
 type: String,
 required: false,
 unique: true
 },
 date: {
   type: Date,
   default: Date.now
 }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);