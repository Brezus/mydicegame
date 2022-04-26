let player1Score = 0
let player2Score = 0
let player1Turn = true

let p1T = 0
let p2T = 0
// maximum rolls allowed
const maxTurns = 6

const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const startBtn = document.getElementById('startGame')
const diceGameBody = document.querySelector('.dice-game-body')
const myAudio = document.getElementById('myAudio')
const diceVal1 = document.getElementById('dice-value1')
const diceVal2 = document.getElementById('dice-value2')
let nextSong = false


// this function configures the classname of the hidden p tag under the dice model the classname it recieves has a css custom animation on it 
function addDiceValAnimation(dval) {
    dval.className = 'dice-val'
    dval.offsetHeight
    dval.classList.add('dice-val-animation')
}


// this function changes the value of the score dynamically whenever it is called by default this score has an opacity of zero
function addDiceVal(dval, num) {
    dval.textContent = num + '+'
    if (num > 3 && num < 6) {
        dval.style.color = '#e5011f'
    } else if (num === 6) {
        dval.style.color = '#e8b81a'
        playSound('man-saying-wow.wav', .4)
    } else {
        dval.style.color = '#3437eb'
    }
}


// this function adds the winner class to provided dice with animation that makes it spin continuously
function addWinner(winnerDice, looserDice) {
    winnerDice.classList.add('winner')
    looserDice.classList.remove('winner')
}


// adjusted the audio of the background music
myAudio.volume = .3

// check when the audio has ended then loop between two different songs/src audio links
myAudio.addEventListener('ended', () => {
    if (!nextSong) {
        myAudio.src = "weeknd-8-bit.mp3";
        myAudio.load();
        myAudio.play();
    } else {
        myAudio.src = "stay-8-bit.mp3";
        myAudio.load();
        myAudio.play();
    }
    nextSong = !nextSong
})

// button that makes the game come into the viewport 
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
    diceGameBody.style.right = '0%'
    myAudio.play()
})

rollBtn.addEventListener("click", () => {
    rollDice()
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

// function that hides the roll button but shows the reset button
function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

// button that rolls dice
function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    const randomNumber2 = Math.floor(Math.random() * 6) + 1
    if (player1Turn) {
        player1Score += randomNumber
        addDiceVal(diceVal1, randomNumber)
        player1Scoreboard.textContent = player1Score
        addDiceClass(randomNumber, player1Dice)
        addDiceValAnimation(diceVal1)
        message.textContent = "Player 2 Turn"
        // increment variable that holds the number of turns player 1 had
        p1T++
    } else {
        player2Score += randomNumber2
        addDiceVal(diceVal2, randomNumber2)
        player2Scoreboard.textContent = player2Score
        addDiceClass(randomNumber2, player2Dice)
        addDiceValAnimation(diceVal2)
        message.textContent = "Player 1 Turn"
        // increment variable that holds the number of turns player 2 had
        p2T++
    }
    player1Turn = !player1Turn
    
    
    // check if both players have reached the desired amount of turns
    if (p1T === maxTurns && p2T === maxTurns) {
        // if so check who has won or if it is a tie
        if (player1Score > player2Score) {
            message.textContent = "Player 1 Won 🥳"
            showResetButton()
            addWinner(player1Dice, player2Dice)
        }  else if (player2Score > player1Score) {
            message.textContent = "Player 2 Won 🎉"
            showResetButton()
            addWinner(player2Dice, player1Dice)
        } else if (player1Score === player2Score) {
            message.textContent = 'Tie'
            showResetButton()
        }
        p1T = 0
        p2T = 0
    }
    
    
    
    // if (player1Score >= 20) {
    //     message.textContent = "Player 1 Won 🥳"
    //     showResetButton()
    //     addWinner(player1Dice, player2Dice)
    // }  else if (player2Score >= 20) {
    //     message.textContent = "Player 2 Won 🎉"
    //     showResetButton()
    //     addWinner(player2Dice, player1Dice)
    // } else if (player1Score >= 20 && player2Score >= 20) {
    //     message.textContent = 'Tie'
    //     showResetButton()
    // }

}

// button to reset game
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.innerHTML = return3dDice()
    player1Dice.classList.remove('winner')
    player2Dice.classList.remove('winner')
    player2Dice.innerHTML = return3dDice()
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

// this function adds one two or three to the dice parent as a class
function addDiceClass(num, dice) {
    let textInts = ['one', 'two', 'three', 'four', 'five', 'six']
    let integers = [1, 2, 3, 4, 5, 6]
    const chosenIndex = integers.findIndex(integer => integer === num)
    playSound('diceSound.mp3', 1)
    dice.className = ''
    dice.className = 'cube is-spinning'
    dice.offsetHeight
    dice.classList.add(textInts[chosenIndex])
}

// this function takes two parameters one for the audio you desire to play and another one (audioVol) to control the volume of that sound
function playSound(sound, audioVol) {
    const audio = new Audio(sound);
    audio.volume = audioVol
    audio.play();
}

// this function returns the html needed to construct the dice model when it is called it returns the let variable called format
function return3dDice() {
    let format = `<div class="cube__face cube__face--front "><div class="die"></div></div>
                            <div class="cube__face cube__face--back "><div class="die"></div><div class="die"></div></div>
                            <div class="cube__face cube__face--right "><div class="die"></div><div class="die"></div><div class="die"></div></div>
                            <div class="cube__face cube__face--left "><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div></div>
                            <div class="cube__face cube__face--top "><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div></div>
                            <div class="cube__face cube__face--bottom "><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div><div class="die"></div></div>`
    return format
}