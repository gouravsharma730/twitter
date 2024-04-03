// Tweet.js
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Tweet', tweetSchema);
