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
	"emojies/flower.png",
	"emojies/pigeon.png",
	"emojies/fire.png",
	"emojies/snow.png",
	"emojies/bouquet.png",
	"emojies/pink-hearts.png",
	"emojies/frustrated.png",
	"emojies/clown.png",
	"emojies/croissant.png",
];

let cards = [];

document.addEventListener("DOMContentLoaded", () => {
	const board = document.getElementById("board");
	const totalCards = 10;

	const divisors = [5, 4, 3];
	let minUnevenIndex = totalCards + 1;

	divisors.forEach((divisor) => {
		const remainder = totalCards % divisor;
		if (remainder !== 0) {
			const startUnevenIndex = totalCards - remainder + 1;
			if (startUnevenIndex < minUnevenIndex) {
				minUnevenIndex = startUnevenIndex;
			}
		}
	});

	for (let i = 1; i <= totalCards; i++) {
		const card = document.createElement("div");
		card.classList.add("card");
		card.id = `card${i}`;

		if (i >= minUnevenIndex) {
			card.classList.add(`uneven-card${i}`);
		}

		const cardInner = document.createElement("div");
		cardInner.classList.add("card-inner");

		const cardFront = document.createElement("div");
		cardFront.classList.add("card-front");

		const frontIcon = document.createElement("div");
		frontIcon.classList.add("icon-hover");

		const cardBack = document.createElement("div");
		cardBack.classList.add("card-back", "icon-hover");

		cardFront.appendChild(frontIcon);
		cardInner.append(cardFront, cardBack);
		card.appendChild(cardInner);
		board.appendChild(card);
	}

	cards = document.querySelectorAll(".card");

	setupCards(emojies);

	cards.forEach((card) => {
		card.addEventListener("click", () => flipCard(card));
	});
});

let firstCard = null;
let secondCard = null;
let lock = false;

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

//changing backround image style of the card
function flipCard(card) {
	if (lock) return;
	if (card === firstCard) return;

	if (!timerStarted) {
		timerStarted = true;
		timerInterval = setInterval(updateTimer, 1000);
	}
	move++;
	moves.textContent = move;
	winMoves.textContent = `Moves: ${move}`;

	const emojiDiv = card.querySelector(".card-back");
	emojiDiv.style.backgroundImage = `url(./assets/${card.dataset.emoji})`;

	const inner = card.querySelector(".card-inner");
	inner.classList.add("flipped");

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
			firstCard.querySelector(".card-inner").classList.remove("flipped");
			secondCard.querySelector(".card-inner").classList.remove("flipped");

			firstCard.querySelector(
				".card-back"
			).style.backgroundImage = `url(./assets/black-puzzle.png)`;
			secondCard.querySelector(
				".card-back"
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
	firstCard = null;
	secondCard = null;
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
		const emojiDiv = card.querySelector(".card-back");
		emojiDiv.style.backgroundImage = `url(./assets/black-puzzle.png)`;
		card.querySelector(".card-inner").classList.remove("flipped");
	});
	setupCards(emojies);
}

function youWinContent() {
	winSection.classList.remove("win-section-show");
}
