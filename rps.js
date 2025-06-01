const CHOICES = ["Rock", "Paper", "Scissors"];
let human_score = 0;
let computer_score = 0;
let round = 0;

function getComputerChoice()
{
  return Math.floor(Math.random() * 3);
}

function displayRound()
{
  let res = document.createElement("p");
  res.textContent = "Round " + round;
  return res
}

function displayScores()
{
  let res = document.createElement("p");
  res.textContent = "Scores: " + human_score + " - " + computer_score;
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
  enableButtons();
  document.getElementById("winner").innerHTML = "";
  document.getElementById("history").innerHTML = "";
}

function roundWinner(human_choice, computer_choice)
{
  let res = "";
  if(human_choice === (computer_choice + 1) % 3) {
    res = ". You won the round!";
    human_score++;
  } else if (computer_choice === (human_choice + 1) % 3) {
    res = ". You lost the round!";
    computer_score++;
  } else {
    res = ". It's a tie!";
  }
  return res;
}

function gameWinner()
{
  let btn = "<button onclick='reset()'>New game</button>";
  if (human_score == 5) {
      disableButtons();
      document.getElementById("winner").innerHTML = "YOU WON THE GAME :D " + btn;
    } else if (computer_score == 5) {
      disableButtons();
      document.getElementById("winner").innerHTML = "YOU LOST THE GAME :( " + btn;
    }
}

function playRound(human_choice) {
  round++;
  let history = document.getElementById("history");
  let played_round = document.createElement("section");
  played_round.appendChild(displayRound());

  let p = document.createElement("p");
  let computer_choice = getComputerChoice();
  p.textContent = CHOICES[human_choice] + " against " + CHOICES[computer_choice];
  p.textContent += roundWinner(human_choice, computer_choice);
  played_round.appendChild(p);
  played_round.appendChild(displayScores());
  history.prepend(played_round);

  gameWinner();
}