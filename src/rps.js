const CHOICES = ["Rock", "Paper", "Scissors"];
let humanScore = 0;
let computerScore = 0;
let humanWins = null;

function getComputerChoice()
{
	return Math.floor(Math.random() * 3);
}

function displayScores()
{
	let res = document.createElement("p");
	res.textContent = humanScore + " - " + computerScore;
	return res
}

function disableButtons()
{
	let allBtns = document.getElementsByTagName("button");
	for (btn of allBtns) {
		btn.disabled = true;
	}
}

function enableButtons()
{
	let allBtns = document.getElementsByTagName("button");
	for (btn of allBtns) {
		btn.disabled = false;
	}
}

function reset()
{
	humanScore = 0;
	computerScore = 0;
	round = 0;
	humanWins = null;
	enableButtons();
	document.getElementById("endgame").textContent = "";
	document.getElementById("round").textContent = "Click on a button to start the game!";
}

function roundDisplay(human_choice, computer_choice)
{
	if(human_choice === (computer_choice + 1) % 3) {
		humanScore++;
		return "You WON the round!";
	}
	if (computer_choice === (human_choice + 1) % 3) {
		computerScore++;
		return "You LOST the round...";
	}
	return "It's a TIE!";
}

function endGame()
{
	disableButtons();
	console.log(humanWins);
	if (humanWins) {
		document.getElementById("endgame").innerHTML = "<p>YOU WON THE GAME :)</p>"
	} else {
		document.getElementById("endgame").innerHTML = "<p>YOU LOST THE GAME :(</p>"
	}
	document.getElementById("endgame").innerHTML += "<button onclick='reset()'>New game</button>";
}

function playRound(human_choice) {
	let played_round = document.getElementById("round");
	played_round.innerHTML = "";

	let computer_choice = getComputerChoice();
	let p = document.createElement("p");
	p.textContent = `${CHOICES[human_choice]} VS ${CHOICES[computer_choice]}`;
	played_round.appendChild(p);
	p = document.createElement("p");
	p.textContent = roundDisplay(human_choice, computer_choice);
	played_round.appendChild(p);
	played_round.appendChild(displayScores());

	if(humanScore == 5) {
		humanWins = true;
		endGame();
	} else if (computerScore == 5) {
		humanWins = false;
		endGame();
	}
}
