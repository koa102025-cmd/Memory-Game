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

const matches = document.getElementById("matches");
const moves = document.getElementById("moves");
let match = 0;
let move = 0;

const playAgainBtn = document.getElementById("play-again");
const winSection = document.getElementById("win-section");
const winMoves = document.getElementById("win-moves");

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
	move++;
	moves.textContent = move;
	winMoves.textContent = `Moves: ${move}`;

	if (firstCard === card) return;
	if (lock) return;

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

function resetTurn() {
	firstCard = 0;
	secondCard = 0;
	lock = false;
}

newGameBtn.addEventListener("click", updateCards);
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
		setupCards(emojies);
	});
}

function youWinContent() {
	winSection.classList.remove("win-section-show");
}
