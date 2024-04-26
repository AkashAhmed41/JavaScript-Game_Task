let level = 1;
let goal = 0;
let maxAttempts = 0;
let totalAttempts = 0;
let totalScore = 0;
let currentScore = 0;

const initializeGame = () => {
  document.querySelector(".level").textContent = level;

  goal = Math.floor(Math.random() * 50) + 1;
  document.querySelector(".goal").textContent = goal;

  maxAttempts = Math.floor(Math.random() * 15) + 1;
  document.querySelector(".max-attempts").textContent = maxAttempts;

  totalScore = 0;
  currentScore = 0;
  totalAttempts = 0;
  document.querySelector(".total-score").textContent = totalScore;
  document.querySelector(".attempts").textContent = totalAttempts;
  document.querySelector(".current-score").textContent = currentScore;
  document.querySelector(".score-tracking").innerHTML = "";
};

initializeGame();

const generateScore = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const updateAttempts = () => {
  totalAttempts++;
  document.querySelector(".attempts").textContent = totalAttempts;
};

const updateTotalScore = (newTotalScore) => {
  totalScore = newTotalScore;
  document.querySelector(".total-score").textContent = totalScore;
};

const updateScoreTracking = (totalScore) => {
  const scoreTrackingDiv = document.querySelector(".score-tracking");
  scoreTrackingDiv.innerHTML = "";
  Array.from({ length: totalScore }).forEach(() => {
    const circle = document.createElement("div");
    circle.classList.add("score-circle");
    scoreTrackingDiv.appendChild(circle);
  });
};

const disablePlayButton = () => {
  playButton.disabled = true;
  playButton.style.cursor = "default";
};

const restorePlayButton = () => {
  playButton.textContent = "Play A Move";
  playButton.disabled = false;
  playButton.style.cursor = "pointer";
};

const displayWinningChanges = () => {
  playButton.textContent = "Congratulations! You've Won.";
  disablePlayButton();

  const levelUpButton = document.createElement("button");
  levelUpButton.textContent = "Level Up?";
  levelUpButton.style.marginTop = "1rem";
  document.querySelector(".current").after(levelUpButton);

  levelUpButton.addEventListener("click", () => {
    level++;
    initializeGame();
    restorePlayButton();
    levelUpButton.remove();
  });
};

const displayLossingChanges = () => {
  playButton.textContent = "Sorry! You've Lost.";
  disablePlayButton();

  const startAgainButton = document.createElement("button");
  startAgainButton.textContent = "Start Again?";
  startAgainButton.style.marginTop = "1rem";
  document.querySelector(".current").after(startAgainButton);

  startAgainButton.addEventListener("click", () => {
    level = 1;
    initializeGame();
    restorePlayButton();
    startAgainButton.remove();
  });
};

const playButton = document.querySelector("button");
playButton.addEventListener("click", () => {
  updateAttempts();
  currentScore = generateScore();
  document.querySelector(".current-score").textContent = currentScore;
  const newTotalScore = totalScore + currentScore;
  if (newTotalScore < goal) {
    updateTotalScore(newTotalScore);
    updateScoreTracking(totalScore);
  } else if (newTotalScore === goal) {
    updateTotalScore(newTotalScore);
    updateScoreTracking(totalScore);
    displayWinningChanges();
  }

  if (totalAttempts === maxAttempts && totalScore < goal) {
    displayLossingChanges();
  }
});
