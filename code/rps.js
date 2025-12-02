class RockPaperScissors
{
constructor(winningScore, playedElement, roundMessageElement, scoreElement, endgameElement)
{
	this.CHOICES = ["Rock", "Paper", "Scissors"];
	this.WINNING_SCORE = winningScore;
	this.playedElement = playedElement;
	this.roundMessageElement = roundMessageElement;
	this.scoreElement = scoreElement;
	this.endgameElement = endgameElement;

	this.humanScore = 0;
	this.computerScore = 0;
}

getWinningScore = () => {return WINNING_SCORE;}

// RPS game functions

getComputerChoice()
{
	return Math.floor(Math.random() * 3);
}

getRoundWinner = (humanChoice, computerChoice) =>
{
	if (humanChoice === (computerChoice + 1) % 3) return 1;
	if (computerChoice === (humanChoice + 1) % 3) return -1;
	return 0;
}

updateScore(roundWinner)
{
	if (roundWinner === 1) this.humanScore++;
	if (roundWinner === -1) this.computerScore++;
}

getRoundText(roundWinner)
{
	if (roundWinner === 1) return "You WON the round!";
	if (roundWinner === -1) return "You LOST the round...";
	return "It's a TIE!";
}

getScoreText()
{
	return this.humanScore + " - " + this.computerScore;
}

playRound(humanChoice)
{
	let computerChoice = this.getComputerChoice();
	this.playedElement.textContent = `${this.CHOICES[humanChoice]} VS ${this.CHOICES[computerChoice]}`;
	let roundWinner = this.getRoundWinner(humanChoice, computerChoice);
	this.updateScore(roundWinner);
	this.roundMessageElement.textContent = this.getRoundText(roundWinner);
	this.scoreElement.textContent = this.getScoreText();

	if(this.isGameWinner(this.humanScore)) {
		this.endGame(true);
	} else if (this.isGameWinner(this.computerScore)) {
		this.endGame(false);
	}
}

isGameWinner(score)
{
	return score === WINNING_SCORE;
}

endGame(humanWins)
{
	this.toggleButtons(true);
	let message = "";
	humanWins ? message = "YOU WON THE GAME :)" : message = "YOU LOST THE GAME :(";
	this.endgameElement.innerHTML = `<p>${message}</p>`;
	// this.endgameElement.innerHTML += "<button onclick='reset()'>New game</button>";
	const btn = document.createElement("button");
	btn.textContent = "New game";
	btn.addEventListener("click", this.reset);
	this.endgameElement.appendChild(btn);
}

// UI-related functions

getAllButtons()
{
	return document.getElementsByTagName("button");
}

toggleButtons(disabled)
{
	for (var btn of this.getAllButtons()) btn.disabled = disabled;
}

reset = () =>
{
	this.humanScore = 0;
	this.computerScore = 0;
	this.toggleButtons(false);
	this.playedElement.textContent = "Click on a button to start the game!";
	this.roundMessageElement.textContent = "";
	this.scoreElement.textContent = "";
	this.endgameElement.innerHTML = "";
}

} // class RockPaperScissors

const WINNING_SCORE = 5;
const playedElement = document.getElementById("played");
const roundMessageElement = document.getElementById("round-result");
const scoreElement = document.getElementById("score");
const endgameElement = document.getElementById("endgame");

document.getElementById("winning-score").textContent = WINNING_SCORE;

const rps = new RockPaperScissors(WINNING_SCORE, playedElement, roundMessageElement, scoreElement, endgameElement);