const CHOICES = ["Rock", "Paper", "Scissors"];
let human_score = 0;
let computer_score = 0;
let round = 0;
let human_wins = null;

function getComputerChoice()
{
  return Math.floor(Math.random() * 3);
}

function displayRound()
{
  let res = document.createElement("h3");
  res.textContent = "Round " + round;
  return res
}

function displayScores()
{
  let res = document.createElement("p");
  res.textContent = human_score + " - " + computer_score;
  return res
}

function disableButtons()
{
  var allBtns = document.getElementsByTagName("button");
  for (btn of allBtns) {
    btn.disabled = true;
  }
}

function enableButtons()
{
  var allBtns = document.getElementsByTagName("button");
  for (btn of allBtns) {
    btn.disabled = false;
  }
}

function reset()
{
  human_score = 0;
  computer_score = 0;
  round = 0;
  human_wins = null;
  enableButtons();
  document.getElementById("endgame").innerHTML = "";
  document.getElementById("round").innerHTML = "Click on a button to start the game!";
}

function roundWinner(human_choice, computer_choice)
{
  let res = "";
  if(human_choice === (computer_choice + 1) % 3) {
    res = "You WON the round!";
    human_score++;
  } else if (computer_choice === (human_choice + 1) % 3) {
    res = "You LOST the round!";
    computer_score++;
  } else {
    res = "It's a TIE!";
  }
  return res;
}

function endGame()
{
  disableButtons();
  console.log(human_wins);
  if (human_wins) {
    document.getElementById("endgame").innerHTML = "<p>YOU WON THE GAME :D</p>"
  } else {
    document.getElementById("endgame").innerHTML = "<p>YOU LOST THE GAME :(</p>"
  }
  document.getElementById("endgame").innerHTML += "<button onclick='reset()'>New game</button>";
}

function playRound(human_choice) {
  round++;
  let played_round = document.getElementById("round");
  played_round.innerHTML = "";
  played_round.appendChild(displayRound());

  let computer_choice = getComputerChoice();
  let p = document.createElement("p");
  p.textContent = CHOICES[human_choice] + " VS " + CHOICES[computer_choice];
  played_round.appendChild(p);
  p = document.createElement("p");
  p.textContent = roundWinner(human_choice, computer_choice);
  played_round.appendChild(p);
  played_round.appendChild(displayScores());

  if(human_score == 5) {
    human_wins = true;
    endGame();
  } else if (computer_score == 5) {
    human_wins = false;
    endGame();
  }
}