const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const resultEmoji = gameModal.querySelector(".result-emoji");
const confettiLayer = gameModal.querySelector(".confetti");
const guessMeterFill = document.querySelector(".guess-meter-fill");
const container = document.querySelector(".container");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
    gameModal.classList.remove("victory", "defeat");
    if (confettiLayer) confettiLayer.innerHTML = "";
    if (guessMeterFill) guessMeterFill.style.width = "0%";
    if (container) container.classList.remove("pulse-good", "pulse-bad");
}

const pulseFeedback = (type) => {
    if (!container) return;
    container.classList.remove("pulse-good", "pulse-bad");
    container.classList.add(type === "good" ? "pulse-good" : "pulse-bad");
    window.setTimeout(() => container.classList.remove("pulse-good", "pulse-bad"), 260);
}

const updateMeter = () => {
    if (!guessMeterFill) return;
    const pct = Math.min(100, Math.max(0, (wrongGuessCount / maxGuesses) * 100));
    guessMeterFill.style.width = `${pct}%`;
}

const burstConfetti = (count = 46) => {
    if (!confettiLayer) return;
    const colors = ["#7c5cff", "#20d3ff", "#34d399", "#ffd166", "#ff4d6d", "#a78bfa"];
    confettiLayer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const piece = document.createElement("span");
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 1.7 + Math.random() * 0.9;
        const size = 6 + Math.floor(Math.random() * 7);
        const rotate = Math.floor(Math.random() * 360);
        const drift = (Math.random() * 120 - 60).toFixed(0);
        piece.style.left = `${left}%`;
        piece.style.animationDelay = `${delay}s`;
        piece.style.animationDuration = `${duration}s`;
        piece.style.width = `${size}px`;
        piece.style.height = `${Math.max(6, Math.floor(size * 0.66))}px`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.setProperty("--r", `${rotate}deg`);
        piece.style.setProperty("--dx", `${drift}px`);
        confettiLayer.appendChild(piece);
    }
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = isVictory ? "images/hangman-0.svg" : "images/hangman-6.svg";
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.toggle("victory", isVictory);
    gameModal.classList.toggle("defeat", !isVictory);
    if (resultEmoji) {
        resultEmoji.textContent = isVictory ? "🎉🥳✨" : "😞💔";
    }
    if (isVictory) burstConfetti();
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        pulseFeedback("good");
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        pulseFeedback("bad");
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    updateMeter();

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);