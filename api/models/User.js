const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    progress: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: Number,
      default: 1,
    },
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
