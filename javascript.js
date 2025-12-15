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
// let matches = 0;
// let moves = 0;
// let seconds = 0;
// let timeRunning = false;
// let timerInterval;

const cards = document.querySelectorAll(".card");
const newGameBtn = document.getElementById("new-game");

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

function flipCard(card) {
	const emojiDiv = card.querySelector(".icon-hover");

	emojiDiv.style.backgroundImage = `url(./assets/${card.dataset.emoji})`;
}

newGameBtn.addEventListener("click", renewCards);

function renewCards() {
	cards.forEach((card) => {
		const emojiDiv = card.querySelector(".icon-hover");

		emojiDiv.style.backgroundImage = `url(./assets/black-puzzle.png)`;
		setupCards(emojies);
	});
}
