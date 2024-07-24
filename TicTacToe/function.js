let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let saladinUnits = ['archer', 'swordsman', 'cavalry'];
let baldwinUnits = ['archer', 'swordsman', 'cavalry'];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusDisplay = document.querySelector('#status');
const cellElements = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart');

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `${currentPlayer === "X" ? "Saladin" : "Baldwin"} wins!`;
        gameActive = false;
        updateUnits(currentPlayer);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerText = "Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `${currentPlayer === "X" ? "Saladin" : "Baldwin"}'s turn`;
}

function updateUnits(winner) {
    let loserImage, winnerImage;
    if (winner === "X") {
        if (baldwinUnits.length > 0) {
            const lostUnit = baldwinUnits.pop();
            const unitElement = document.querySelector(`#baldwin-units img[alt="${capitalizeFirstLetter(lostUnit)}"]`);
            unitElement.style.opacity = "0.2";
        }
        loserImage = document.querySelector('.leftman .image');
        winnerImage = document.querySelector('.rightman .image');
    } else {
        if (saladinUnits.length > 0) {
            const lostUnit = saladinUnits.pop();
            const unitElement = document.querySelector(`#saladin-units img[alt="${capitalizeFirstLetter(lostUnit)}"]`);
            unitElement.style.opacity = "0.2";
        }
        loserImage = document.querySelector('.rightman .image');
        winnerImage = document.querySelector('.leftman .image');
    }

    loserImage.classList.add('defeated');
    winnerImage.classList.add('victorious');

    if (baldwinUnits.length === 0) {
        statusDisplay.innerText = "Saladin wins the war!";
        gameActive = false;
    } else if (saladinUnits.length === 0) {
        statusDisplay.innerText = "Baldwin wins the war!";
        gameActive = false;
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "Saladin's turn";
    cellElements.forEach(cell => cell.innerText = "");
    
    if (saladinUnits.length === 0 || baldwinUnits.length === 0) {
        saladinUnits = ['archer', 'swordsman', 'cavalry'];
        baldwinUnits = ['archer', 'swordsman', 'cavalry'];
        document.querySelectorAll('.unit-icon').forEach(icon => icon.style.opacity = "1");
    }
    document.querySelectorAll('.image').forEach(img => {
        img.classList.remove('defeated', 'victorious');
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

cellElements.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

statusDisplay.innerText = "Saladin's turn";