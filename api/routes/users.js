const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');

const router = express.Router();

// Fetch users (example)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return user details (excluding sensitive information like password)
    const { _id, username, level } = user;
    res.json({ _id, username, level });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/submitAnswers', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { howManyCorrect } = req.body;

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.level.progress += 1;

    switch (howManyCorrect) {
      case 0:
        if (user.level.difficulty > 0) {
          user.level.difficulty -= 1;
        }
        break;
      case 1:
      case 2:
        break;
      case 3:
        if (user.level.difficulty < 2) {
          user.level.difficulty += 1;
        }
        break;
      default:
        throw new Error('Invalid number of correct answers');
    }

    await user.save();

    // Return user details (excluding sensitive information like password)
    const { _id, username, level } = user;
    res.json({ _id, username, level });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/resetProgress', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.level.progress = 0;
    user.level.difficulty = 1;

    await user.save();

    // Return user details (excluding sensitive information like password)
    const { _id, username, level } = user;
    res.json({ _id, username, level });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getNextTutorial', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const tutorial = await Tutorial.findOne({ tutorialId: user.level.progress + 1 });

    if (!tutorial) {
      // return info that there are no more tutorials
      return res.json({ tutorialId: -1 });
    }

    let nextTutorial = null;

    switch (user.level.difficulty) {
      case 0:
        nextTutorial = {
          tutorialId: tutorial.tutorialId,
          name: tutorial.name,
          video: tutorial.videos.easy,
          quiz: tutorial.quizes.easy,
        };
        break;
      case 1:
        nextTutorial = {
          tutorialId: tutorial.tutorialId,
          name: tutorial.name,

          video: tutorial.videos.medium,
          quiz: tutorial.quizes.medium,
        };
        break;
      case 2:
        nextTutorial = {
          tutorialId: tutorial.tutorialId,
          name: tutorial.name,
          video: tutorial.videos.hard,
          quiz: tutorial.quizes.hard,
        };
        break;
      default:
        throw new Error('Invalid difficulty');
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return user details (excluding sensitive information like password)
    res.json(nextTutorial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
