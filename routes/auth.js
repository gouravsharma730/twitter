const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'User already exist.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password!' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password!' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in!' });
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});


router.post('/:userId/follow', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const loggedInUserId = req.user;

    const userToFollow = await User.findById({_id:loggedInUserId});
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found.' });
    }
    userToFollow.followers.push(userId);
    await userToFollow.save();

    res.json({ message: 'User followed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Unfollow a user
router.post('/:userId/unfollow', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const loggedInUserId = req.user;

    const userToUnfollow = await User.findById({_id:loggedInUserId});
    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const isFollowing = userToUnfollow.followers.includes(userId);
    if (!isFollowing) {
      return res.status(400).json({ message: 'You are not following this user.' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (follower) => follower.toString() !== userId
    );
    await userToUnfollow.save();

    res.json({ message: 'User unfollowed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
