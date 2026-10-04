const emojiPool = [
  "😀",
  "😎",
  "🤠",
  "🥳",
  "🤖",
  "👻",
  "👽",
  "💀",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐸",
  "🐵",
  "🦁",
  "🐯",
  "🐷",
  "🐙",
  "🦄",
  "🐝",
  "🦋",
  "🐞",
  "🐢",
  "🐬",
  "🦈",
  "🦀",
  "🐠",
  "🦜",
  "🍎",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍒",
  "🍍",
  "🥝",
  "🍕",
  "🍔",
  "🌭",
  "🍟",
  "🌮",
  "🍩",
  "🍪",
  "🍿",
  "⚽",
  "🏀",
  "🏈",
  "⚾",
  "🎾",
  "🏐",
  "🎱",
  "🏓",
  "🚗",
  "🚕",
  "🚓",
  "🚑",
  "🚒",
  "🚜",
  "🚲",
  "✈️",
  "🚀",
  "🚁",
  "⛵",
  "🚢",
  "🚂",
  "🛸",
  "🏎️",
  "🛶",
  "🎸",
  "🎹",
  "🥁",
  "🎺",
  "🎻",
  "🎷",
  "🎧",
  "🎤",
  "💡",
  "📚",
  "✏️",
  "📷",
  "🔑",
  "🔔",
  "🎁",
  "🧩",
  "⭐",
  "🌙",
  "☀️",
  "🌈",
  "🔥",
  "❄️",
  "⚡",
  "💧",
  "❤️",
  "💙",
  "💛",
  "🤍",
  "🖤",
  "🍄",
  "🌵",
  "🌴",
  "🌻",
  "🌹",
  "🌲",
  "🍀",
  "🌺",
];

const gameBoard = document.getElementById("game-board");
function populateBoard(deck) {
  // Clear board before populating
  gameBoard.innerHTML = "";
  for (let i = 0; i < deck.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = deck[i];
    const symbol = document.createElement("span");
    symbol.classList.add("card-symbol");
    symbol.innerText = deck[i];

    card.appendChild(symbol);
    gameBoard.appendChild(card);
  }
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

let firstCard = null;
let secondCard = null;
let boardLocked = false;

gameBoard.addEventListener("click", (event) => {
  const card = event.target.closest(".card");

  handleCard(card);
  cards[selectedCardIndex].classList.remove("selected");
});
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const cards = gameBoard.querySelectorAll(".card");
  console.log(event.key, selectedCardIndex);
  const nextIndex = selectedCardIndex + 1;
  if (selectedCardIndex === null) {
    selectedCardIndex = 0;
    cards[selectedCardIndex].classList.add("selected");
    return;
  }
  if (event.key === "ArrowRight") {
    if ((selectedCardIndex + 1) % columns !== 0 && nextIndex < cards.length) {
      cards[selectedCardIndex].classList.remove("selected");
      selectedCardIndex++;
      cards[selectedCardIndex].classList.add("selected");
    }
  }
  if (event.key === "ArrowLeft") {
    if (selectedCardIndex % columns !== 0) {
      cards[selectedCardIndex].classList.remove("selected");
      selectedCardIndex--;
      cards[selectedCardIndex].classList.add("selected");
    }
  }
  if (event.key === "ArrowDown") {
    if (selectedCardIndex + columns < cards.length) {
      cards[selectedCardIndex].classList.remove("selected");
      selectedCardIndex += columns;
      cards[selectedCardIndex].classList.add("selected");
    }
  }
  if (event.key === "ArrowUp") {
    if (selectedCardIndex - columns >= 0) {
      cards[selectedCardIndex].classList.remove("selected");
      selectedCardIndex -= columns;
      cards[selectedCardIndex].classList.add("selected");
    }
  }
  if (event.key === " ") {
    handleCard(cards[selectedCardIndex]);
  }
});
document.addEventListener("mousemove", () => {
  const selectedCard = gameBoard.querySelector(".selected");
  if (selectedCard) {
    selectedCard.classList.remove("selected");
  }
});
function handleCard(card) {
  if (card) {
    if (!boardLocked && !card.classList.contains("flipped")) {
      card.classList.add("flipped");
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        compareCards(firstCard, secondCard);
      }
    }
  }
}
function compareCards(firstCard, secondCard) {
  boardLocked = true;
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    updateSuccess();
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
      updateFailure();
    }, 1000);
  }
}
function resetCards() {
  firstCard = null;
  secondCard = null;
  boardLocked = false;
}
function boardSize(cardCount) {
  let biggestCardSize = 0;
  let columnsCandidate = 0;
  let rowsCandidate = 0;

  for (let i = 1; i <= cardCount; i++) {
    const rows = Math.ceil(cardCount / i);
    const candidateCardSize = cardSize(rows, i);

    if (biggestCardSize < candidateCardSize) {
      biggestCardSize = candidateCardSize;
      columnsCandidate = i;
      rowsCandidate = rows;
    }
  }
  return {
    rows: rowsCandidate,
    columns: columnsCandidate,
  };

  // let candidate = Math.floor(Math.sqrt(cardCount));

  // while (cardCount % candidate !== 0) {
  //   candidate--;
  // }

  // const rows = candidate;
  // const columns = cardCount / candidate;
  // return {
  //   rows,
  //   columns,
  // };
}
function cardSize(rows, columns) {
  const main = document.querySelector("main");
  const mainWidth = main.clientWidth;
  const mainHeight = main.clientHeight;

  const gap = getComputedStyle(gameBoard);
  const columnGap = parseFloat(gap.columnGap);
  const rowGap = parseFloat(gap.rowGap);

  const usableWidth = mainWidth - (columns - 1) * columnGap;
  const usableHeight = mainHeight - (rows - 1) * rowGap;
  const horizontalCardSize = usableWidth / columns;
  const verticalCardSize = usableHeight / rows;
  console.log("mainWidth:", main.clientWidth);
  console.log("mainHeight:", main.clientHeight);
  console.log("rows:", rows);
  console.log("columns:", columns);
  return Math.min(horizontalCardSize, verticalCardSize);
}
const successParagraph = document.getElementById("success-count");
const failureParagraph = document.getElementById("failure-count");

function updateSuccess() {
  successCount++;
  successParagraph.innerText = "✔: " + successCount;
  if (successCount === gameDeck.length / 2) {
    setTimeout(() => {
      let winStats = document.getElementById("win-stats");
      winStats.innerText =
        successCount +
        " matches in " +
        (successCount + failedCount) +
        " moves.";
      winDialog.showModal();
      launchConfetti();
    }, 100);
  }
}
function updateFailure() {
  failedCount++;
  failureParagraph.innerText = "✘: " + failedCount;
}
function updateBoardSize(rows, columns) {
  const size = cardSize(rows, columns);
  const emojiSize = size * 0.6;

  gameBoard.style.gridTemplateColumns = `repeat(${columns}, minmax(0,${size}px))`;

  const symbols = document.querySelectorAll(".card-symbol");
  symbols.forEach((symbol) => {
    symbol.style.fontSize = `${emojiSize}px`;
  });
}
const confettiContainer = document.getElementById("confetti-container");

function launchConfetti() {
  confettiContainer.innerHTML = "";

  const colors = [
    "#264653",
    "#157066",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
    "#ffffff",
  ];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("span");

    confetti.classList.add("confetti");

    confetti.style.left = `${Math.random() * 100}%`;

    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.setProperty("--fall-delay", `${Math.random() * 0.8}s`);

    confetti.style.setProperty(
      "--fall-duration",
      `${2 + Math.random() * 1.5}s`,
    );

    confetti.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);

    confetti.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);

    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 4000);
}

const pairSlider = document.getElementById("range");
pairSlider.addEventListener("input", (event) => {
  pairValue.innerText = event.target.value;
});
window.addEventListener("resize", () => {
  updateBoardSize(rows, columns);
});

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", () => {
  resetCards();
  numberOfEmojis = pairSlider.value;
  prepareBoard(numberOfEmojis);
});
function prepareBoard(numberOfEmojis) {
  shuffle(randomDeck);
  gameDeck = [...randomDeck];
  gameDeck = gameDeck.slice(0, numberOfEmojis);
  gameDeck = [...gameDeck, ...gameDeck];
  shuffle(gameDeck);
  populateBoard(gameDeck);
  resetGameState();
  ({ rows, columns } = boardSize(gameDeck.length));

  requestAnimationFrame(() => {
    updateBoardSize(rows, columns);
  });
}
function resetGameState() {
  failedCount = 0;
  successCount = 0;
  failureParagraph.innerText = "✘: 0";
  successParagraph.innerText = "✔: 0";
  selectedCardIndex = null;
  boardLocked = false;
  firstCard = null;
  secondCard = null;
}
const winDialog = document.getElementById("win-dialog");
const closeWinDialog = document.getElementById("close-win-dialog");
closeWinDialog.addEventListener("click", () => {
  winDialog.close();
});
// GAME START (eventual loop)
let failedCount = 0;
let successCount = 0;
let selectedCardIndex = null;
const randomDeck = [...emojiPool];
let gameDeck = [...randomDeck];
let { rows, columns } = boardSize(gameDeck.length);

const pairValue = document.getElementById("number-pairs");
pairValue.innerText = pairSlider.value;
//Player input here
// shuffle(randomDeck);
// gameDeck = gameDeck.slice(0, numberOfEmojis);
// gameDeck = [...gameDeck, ...gameDeck];
// shuffle(gameDeck);
// populateBoard(gameDeck);
// requestAnimationFrame(() => {
//   updateBoardSize(rows, columns);
// });
