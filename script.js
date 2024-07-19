const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const finalColumnTo = document.querySelector('[data-final-column-to]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const roundScoreSpan = document.querySelector('[data-round-score]');
const SELECTION = [
  {
    name: 'Камень',
    emoji: '✊',
    beats: 'Ножницы'
  },
  {
    name: 'Ножницы',
    emoji: '✌️',
    beats: 'Бумага'
  },
  {
    name: 'Бумага',
    emoji: '🤚',
    beats: 'Камень'
  }
];

let userWins = 0;
let computerWins = 0;

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTION.find(selection => selection.name === selectionName);
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResultTo(selection, yourWinner);

  if (yourWinner) {
    incrementScore(yourScoreSpan);
    userWins++;
    updateRoundScoreText('player'); 
  } else if (computerWinner) {
    incrementScore(computerScoreSpan);
    computerWins++;
    updateRoundScoreText('computer'); 
  } else {
    updateRoundScoreText('');  
  }

  if (userWins === 5 || computerWins === 5) {
    endGame();
  }
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTION.length);
  return SELECTION[randomIndex];
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-button');
  if (winner) {
    div.classList.add('winner');
  }
  finalColumn.append(div);
}

function addSelectionResultTo(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('result-button');
  if (winner) {
    div.classList.add('winner');
  }
  finalColumnTo.append(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function endGame() {
  const winner = userWins === 5 ? 'Ура, Победа!' : 'Да блин, ты проиграл...';
  alert(winner);
  resetGame();
}

function resetGame() {
  userWins = 0;
  computerWins = 0;
  yourScoreSpan.textContent = '0';
  computerScoreSpan.textContent = '0';
  roundScoreSpan.textContent = 'Выбирай с умом, на кон поставлено всё!'; 
  clearResults(finalColumn);
  clearResults(finalColumnTo);
}

function clearResults(column) {
  const results = column.querySelectorAll('.result-button, .result-button.winner');
  results.forEach(result => result.remove());
}

function updateRoundScoreText(winner) {
  if (winner === 'player') {
    roundScoreSpan.innerText = 'Что за тигр, этот лев, ты победил в этом раунде!';
  } else if (winner === 'computer') {
    roundScoreSpan.innerText = 'Ты бы победил, если бы не проиграл....';
  } else {
    roundScoreSpan.innerText = 'Ничья!';
  }
}
