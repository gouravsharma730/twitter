const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Tweet = require('../models/Tweet');

router.use(authMiddleware);

router.post('/create', async (req, res) => {
  try {
    const { content } = req.body;
    if(!content) res.status(500).json({ error: 'Empty Content' });
    const tweet = new Tweet({ content, userId: req.user });
    await tweet.save();
    res.status(201).json({ message: 'Tweet created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tweet!' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { content } = req.body;
    
    const tweet = await Tweet.findOneAndUpdate(
      { _id: tweetId, userId: req.user },
      { content },
      { new: true }
    );
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found or unauthorized' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tweet' });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findOneAndDelete({ _id: tweetId, userId: req.user });

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found or unauthorized' });
    }

    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tweet' });
  }
});


module.exports = router;
