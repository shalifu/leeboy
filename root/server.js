// server.js
const express = require('express');
const path = require('path');
const app = express();

// Basic in-memory "leaderboard"
const leaderboard = [];

// Questions by level
const { QUESTIONS } = require('./data/question');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Get available levels
app.get('/api/levels', (req, res) => {
  res.json(Object.keys(QUESTIONS));
});

// Get questions for a level
app.get('/api/questions/:level', (req, res) => {
  const level = req.params.level;
  const qs = QUESTIONS[level];
  if (!qs) {
    return res.status(404).json({ error: 'Level not found' });
  }
  // Send without answers to client for fairness; answers checked server-side
  const sanitized = qs.map(({ id, prompt, options, type }) => ({ id, prompt, options, type }));
  res.json({ level, questions: sanitized });
});

// Submit answers and compute score
app.post('/api/submit', (req, res) => {
  const { playerName, level, answers } = req.body;
  const qs = QUESTIONS[level];
  if (!playerName || !level || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  if (!qs) return res.status(404).json({ error: 'Level not found' });

  let score = 0;
  let correctCount = 0;
  let streak = 0;
  const details = [];

  // Create map for quick lookup
  const keyById = new Map(qs.map(q => [q.id, q]));

  answers.forEach((a, idx) => {
    const q = keyById.get(a.id);
    if (!q) return;
    const isCorrect = q.answer === a.choice;
    if (isCorrect) {
      correctCount++;
      streak++;
      // Base points per level
      const base = level === 'beginner' ? 10 : level === 'intermediate' ? 20 : 30;
      // Streak bonus (small)
      const bonus = Math.min(streak * 2, 10);
      score += base + bonus;
    } else {
      streak = 0;
    }
    details.push({ id: q.id, correct: isCorrect, yourAnswer: a.choice, correctAnswer: q.answer });
  });

  // Level completion bonus for high accuracy
  const accuracy = correctCount / qs.length;
  if (accuracy >= 0.8) score += level === 'advanced' ? 50 : level === 'intermediate' ? 30 : 20;

  // Save to leaderboard (top 10)
  leaderboard.push({ playerName, level, score, accuracy: Number(accuracy.toFixed(2)), date: new Date().toISOString() });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.splice(10);

  res.json({ score, correctCount, total: qs.length, accuracy: Number(accuracy.toFixed(2)), details });
});

// Leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Skills Elevation app running on http://localhost:${PORT}`));
