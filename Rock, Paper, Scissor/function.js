let playerChoice = null;
const choices = ['rock', 'paper', 'scissors'];
const resultDiv = document.getElementById('result');
const cpuChoiceImg = document.getElementById('cpu-choice');
const shakeButton = document.getElementById('shake');

function selectChoice(choice) {
    playerChoice = choice;
    document.querySelectorAll('#player button').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`#player button img[alt="${choice.charAt(0).toUpperCase() + choice.slice(1)}"]`).parentElement.classList.add('selected');
    shakeButton.disabled = false;
}

function getCpuChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playGame() {
    if (!playerChoice) return;

    const cpuChoice = getCpuChoice();
    cpuChoiceImg.src = `img/${cpuChoice}.png`;
    cpuChoiceImg.alt = cpuChoice;

    let result;
    if (playerChoice === cpuChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        result = "You win!";
    } else {
        result = "CPU wins!";
    }

    resultDiv.textContent = result;
    shakeButton.disabled = true;
}

function restart() {
    playerChoice = null;
    document.querySelectorAll('#player button').forEach(btn => btn.classList.remove('selected'));
    cpuChoiceImg.src = 'img/question.png';
    cpuChoiceImg.alt = 'CPU Choice';
    resultDiv.textContent = '';
    shakeButton.disabled = true;
}

// Initialize the game
restart();