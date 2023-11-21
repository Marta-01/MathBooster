const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  questions: [{ type: String, required: true }],
  answers: [{ type: String, required: true }],
});

const levelSchema = new mongoose.Schema({
  easy: { type: String, required: true },
  medium: { type: String, required: true },
  hard: { type: String, required: true },
});

const tutorialSchema = new mongoose.Schema({
  videos: { type: levelSchema, required: true },
  quizes: {
    easy: { type: quizSchema, required: true },
    medium: { type: quizSchema, required: true },
    hard: { type: quizSchema, required: true },
  },
  tutorialId: { type: Number, required: true },
}, { collection: 'tutorials' });

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;
