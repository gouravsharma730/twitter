const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const loggedInUser = await User.findById({_id:loggedInUserId});
    if (!loggedInUser) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const followedUserIds = loggedInUser.followers;
    console.log(followedUserIds);
    const timelineTweets = await Tweet.find({ userId: { $in: followedUserIds } })
      .sort({ createdAt: -1 });

    res.json(timelineTweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
