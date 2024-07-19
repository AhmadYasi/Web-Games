let diceValue1 = 1;
let diceValue2 = 1;

function getRandomRotation() {
    const rotations = [
        [0, 0, 0],    
        [0, 180, 0],  
        [0, 90, 0],  
        [0, -90, 0],   
        [90, 0, 0],  
        [-90, 0, 0]    
    ];
    const index = Math.floor(Math.random() * 6);
    return { rotation: rotations[index], value: index + 1 };
}

function rollDice() {
    let dice1 = document.getElementById('dice1');
    let dice2 = document.getElementById('dice2');
    const input = document.getElementById('input');
    const guessValue = parseInt(input.value);

    let result1 = getRandomRotation();
    let result2 = getRandomRotation();

    dice1.style.transform = `rotateX(${result1.rotation[0]}deg) rotateY(${result1.rotation[1]}deg) rotateZ(${result1.rotation[2]}deg)`;
    dice2.style.transform = `rotateX(${result2.rotation[0]}deg) rotateY(${result2.rotation[1]}deg) rotateZ(${result2.rotation[2]}deg)`;

    diceValue1 = result1.value;
    diceValue2 = result2.value;

    let totalDiceValue = diceValue1 + diceValue2;

    setTimeout(() => {
        if (guessValue === totalDiceValue) {
            alert(`Success! Your guess (${guessValue}) matches the dice roll (${diceValue1} + ${diceValue2} = ${totalDiceValue}).`);
        } else {
            alert(`Failure. The dice rolled ${diceValue1} and ${diceValue2} (total ${totalDiceValue}), but you guessed ${guessValue}.`);
        }
    }, 1100);
}
