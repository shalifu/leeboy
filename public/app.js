// public/app.js
const state = {
  playerName: '',
  level: null,
  questions: [],
  index: 0,
  score: 0,
  answers: [],
  timerEnabled: true,
  timePerQuestion: 25,
  countdown: null,
  unlockedLevels: JSON.parse(localStorage.getItem('unlockedLevels')) || ['beginner'],
  levels: ['beginner', 'intermediate', 'advanced', 'expert', 'master']
};

const $ = (id) => document.getElementById(id);
const setupEl = $('setup');
const quizEl = $('quiz');
const resultEl = $('result');
const boardEl = $('leaderboard');

const playerNameEl = $('playerName');
const levelButtonsEl = $('levelButtons');
const startBtn = $('startBtn');

const hudLevel = $('hudLevel');
const hudIndex = $('hudIndex');
const hudTotal = $('hudTotal');
const hudScore = $('hudScore');
const hudTimer = $('hudTimer');
const promptEl = $('prompt');
const optionsEl = $('options');
const nextBtn = $('nextBtn');
const finalScore = $('finalScore');
const finalAccuracy = $('finalAccuracy');
const detailList = $('detailList');
const restartBtn = $('restartBtn');

async function loadLevels() {
  levelButtonsEl.innerHTML = '';
  state.unlockedLevels.forEach(level => {
    const btn = document.createElement('button');
    btn.textContent = capitalize(level);
    btn.classList.add('level-btn');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.level = level;
      startBtn.disabled = false;
    });
    levelButtonsEl.appendChild(btn);
  });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

async function startGame() {
  const name = playerNameEl.value.trim();
  if (!name) { alert('Please enter your name'); return; }
  if (!state.level) { alert('Please select a level'); return; }
  state.playerName = name;
  state.index = 0;
  state.score = 0;
  state.answers = [];
  const res = await fetch(`/api/questions/${state.level}`);  if (!res.ok) {
    const error = await res.json();
    alert(`Error: ${error.error}`);
    return;
  }  const data = await res.json();
  state.questions = data.questions;
  alert(`Loaded ${state.questions.length} questions for ${state.level}`);

  setupEl.classList.add('hidden');
  quizEl.classList.remove('hidden');
  hudLevel.textContent = capitalize(state.level);
  hudTotal.textContent = state.questions.length.toString();
  hudScore.textContent = state.score.toString();

  renderQuestion();
}

function renderQuestion() {
  clearTimer();
  nextBtn.classList.add('hidden');

  const q = state.questions[state.index];
  hudIndex.textContent = (state.index + 1).toString();
  promptEl.textContent = q.prompt;
  optionsEl.innerHTML = '';
 q.options.forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.addEventListener('click', () => selectAnswer(q, opt, li));
    optionsEl.appendChild(li);
  });

  if (state.timerEnabled) startTimer();
}

function startTimer() {
  let t = state.timePerQuestion;
  hudTimer.textContent = `${t}s`;
  state.countdown = setInterval(() => {
    t--;
    hudTimer.textContent = `${t}s`;
    if (t <= 0) {
      clearTimer();
      lockQuestion(null); // No answer
    }
  }, 1000);
}
function clearTimer() {
  if (state.countdown) {
    clearInterval(state.countdown);
    state.countdown = null;
    hudTimer.textContent = '—';
  }
}

function selectAnswer(q, choice, li) {
  // prevent multiple selections
  if (nextBtn.classList.contains('hidden') === false) return;

  clearTimer();
  lockQuestion(choice);
}

function lockQuestion(choice) {
  const q = state.questions[state.index];

  // Temporarily mark correctness client-side using a heuristic:
  // server will compute actual correctness when submitting.
  Array.from(optionsEl.children).forEach(x => {
    x.classList.add('wrong');
    if (x.textContent === choice) x.classList.add('selected');
  });
 // Record answer (even null choice for timeouts)
  state.answers.push({ id: q.id, choice });

  // Reveal Next
  nextBtn.classList.remove('hidden');
  nextBtn.onclick = next;
}

function next() {
  if (state.index < state.questions.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    finish();
  }
}

async function finish() {
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');

  const payload = {
    playerName: state.playerName,
    level: state.level,
    answers: state.answers
  };
 const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();

  // Unlock next level if completed
  const currentIndex = state.levels.indexOf(state.level);
  if (currentIndex < state.levels.length - 1) {
    const next = state.levels[currentIndex + 1];
    if (!state.unlockedLevels.includes(next)) {
      state.unlockedLevels.push(next);
      localStorage.setItem('unlockedLevels', JSON.stringify(state.unlockedLevels));
      alert(`Congratulations! You've unlocked the ${capitalize(next)} level!`);
    }
  }

  // Render results
  finalScore.textContent = data.score;
  finalAccuracy.textContent = `${(data.accuracy * 100).toFixed(0)}%`;

  detailList.innerHTML = '';
  data.details.forEach(d => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div><strong>Question:</strong> ${d.id}</div>
      <div><strong>Your answer:</strong> ${d.yourAnswer ?? '(none)'}</div>
      <div><strong>Correct:</strong> ${d.correct ? 'Yes' : 'No'} (${d.correctAnswer})</div>
    `;
    div.className = d.correct ? 'correct' : 'wrong';
    detailList.appendChild(div);
  });
  await loadLeaderboard();
}

async function loadLeaderboard() {
  const res = await fetch('/api/leaderboard');
  const list = await res.json();
  boardEl.innerHTML = '';
  list.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.playerName} — ${capitalize(item.level)} — ${item.score} pts — ${Math.round(item.accuracy * 100)}%`;
    boardEl.appendChild(li);
  });
}

restartBtn.addEventListener('click', () => {
  resultEl.classList.add('hidden');
  setupEl.classList.remove('hidden');
  playerNameEl.value = '';
  state.level = null;
  state.unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || ['beginner'];
  loadLevels();
  startBtn.disabled = true;
});

startBtn.addEventListener('click', startGame);
window.addEventListener('DOMContentLoaded', () => {
  loadLevels();
  loadLeaderboard();
  startBtn.disabled = true;
});
