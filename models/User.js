const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, 
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  timestamps: Boolean
});

module.exports = mongoose.model('User', userSchema);
