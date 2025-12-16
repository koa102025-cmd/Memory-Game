const emojies = [
	"emojies/sad.png",
	"emojies/cat.png",
	"emojies/cool.png",
	"emojies/angel.png",
	"emojies/demon.png",
	"emojies/fish.png",
	"emojies/sleep.png",
	"emojies/regn.png",
	"emojies/tea.png",
	"emojies/think.png",
];

let firstCard = 0;
let secondCard = 0;
let lock = false;

const cards = document.querySelectorAll(".card");
const newGameBtn = document.getElementById("new-game");

//for section-match (Memory match box)
const matches = document.getElementById("matches");
const moves = document.getElementById("moves");
let match = 0;
let move = 0;
const time = document.getElementById("time");
let timerInterval;
let seconds = 0;
let timerStarted = false;

//for win-section
const playAgainBtn = document.getElementById("play-again");
const winSection = document.getElementById("win-section");
const winMoves = document.getElementById("win-moves");
const winTime = document.getElementById("win-time");

//shuffle array
function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

let cardEmojies = [];

//giving dataset with emoji and making 5 par of an array
function setupCards(emojies) {
	//picking 5 random emojies
	const selected = shuffle([...emojies]).slice(0, 5);

	//making 10 elements
	cardEmojies = shuffle([...selected, ...selected]);

	cards.forEach((card, index) => {
		card.dataset.emoji = cardEmojies[index];
	});
}
setupCards(emojies);
cards.forEach((card) => {
	card.addEventListener("click", () => flipCard(card));
});

//changing backround image style of the card
function flipCard(card) {
	if (!timerStarted) {
		timerStarted = true;
		timerInterval = setInterval(updateTimer, 1000);
	}

	if (firstCard === card) return;
	if (lock) return;
	move++;
	moves.textContent = move;
	winMoves.textContent = `Moves: ${move}`;

	const emojiDiv = card.querySelector(".icon-hover");

	emojiDiv.style.backgroundImage = `url(./assets/${card.dataset.emoji})`;
	if (!firstCard) {
		firstCard = card;
		return;
	}
	secondCard = card;
	lock = true;
	checkMatch();
}

function checkMatch() {
	const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

	if (isMatch) {
		match++;
		matches.textContent = `${match}/5`;
		if (match === 5) {
			winSection.classList.add("win-section-show");
			resetTimer();
		}

		// fCard = 0; sCard = 0; lock = 0
		resetTurn();
	} else {
		setTimeout(() => {
			firstCard.querySelector(
				".icon-hover"
			).style.backgroundImage = `url(./assets/black-puzzle.png)`;
			secondCard.querySelector(
				".icon-hover"
			).style.backgroundImage = `url(./assets/black-puzzle.png)`;
			resetTurn();
		}, 800);
	}
}

function updateTimer() {
	seconds++;

	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;

	let formattedSecs = secs;
	if (secs < 10) {
		formattedSecs = `0${secs}`;
	}
	time.textContent = `${mins}:${formattedSecs}`;
	winTime.textContent = `Time: ${mins}:${formattedSecs}`;
}

function resetTimer() {
	clearInterval(timerInterval);
	seconds = 0;
	timerStarted = false;
	time.textContent = `0:00`;
}

function resetTurn() {
	firstCard = 0;
	secondCard = 0;
	lock = false;
}

newGameBtn.addEventListener("click", () => {
	resetTimer();
	updateCards();
});
playAgainBtn.addEventListener("click", () => {
	youWinContent();
	updateCards();
});

function updateCards() {
	match = 0;
	move = 0;
	matches.textContent = `${match}/5`;
	moves.textContent = move;

	cards.forEach((card) => {
		const emojiDiv = card.querySelector(".icon-hover");

		emojiDiv.style.backgroundImage = `url(./assets/black-puzzle.png)`;
	});
	setupCards(emojies);
}

function youWinContent() {
	winSection.classList.remove("win-section-show");
}
