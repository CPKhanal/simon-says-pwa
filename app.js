const btns = ["red", "yellow", "green", "purple"];
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;

// Elements
const startBtn = document.getElementById("startBtn");
const levelDisplay = document.getElementById("level");
const highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.textContent = highScore;

// Load Sounds
const sounds = {
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  green: new Audio("sounds/green.mp3"),
  purple: new Audio("sounds/purple.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};

// Mute Toggle
let isMuted = false;
const muteBtn = document.getElementById("toggleMute");
const muteIcon = document.getElementById("muteIcon");

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteIcon.className = isMuted ? "ph ph-speaker-x" : "ph ph-speaker-high";
});

// Play Sound
function playSound(color) {
  if (isMuted || !sounds[color]) return;
  sounds[color].currentTime = 0;
  sounds[color].play();
}

// Flash Button
function flashButton(btnId) {
  const btn = document.getElementById(btnId);
  btn.classList.add("opacity-50");
  playSound(btnId);
  setTimeout(() => {
    btn.classList.remove("opacity-50");
  }, 200);
}

// Level Up
function levelUp() {
  userSeq = [];
  level++;
  levelDisplay.textContent = level;

  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  gameSeq.push(randColor);

  setTimeout(() => {
    flashButton(randColor);
  }, 500);
}

// Reset Game
function resetGame() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonHighScore", highScore);
    highScoreDisplay.textContent = highScore;
  }

  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
  startBtn.textContent = "Play Again";
  startBtn.classList.remove("hidden");
}

// Check User Answer
function checkAnswer(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    setTimeout(() => {
      alert(`❌ Wrong! Final score: ${level}`);
      resetGame();
    }, 100);
  }
}

// Handle User Click
function handleUserClick(e) {
  if (!started) return;
  const color = e.target.id;
  userSeq.push(color);
  flashButton(color);
  checkAnswer(userSeq.length - 1);
}

// Start Game
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", handleUserClick);
});

startBtn.addEventListener("click", () => {
  if (started) return;
  startBtn.classList.add("hidden");
  level = 0;
  gameSeq = [];
  started = true;
  levelUp();
});
