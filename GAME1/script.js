const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const checkWin = () => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  return gameState.every((cell) => cell !== "");
};

const handlePlayAgain = () => {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  message.textContent = "";
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

playAgainButton.addEventListener("click", handlePlayAgain);
