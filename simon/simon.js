/*
  Simon Memory Game

  * A pattern is given by activing on the four boxes.
  * The player must replicate the pattern
  * If successfully, the pattern is shown again with one more box
  * added to the end.
  * This continues in the player is unsuccesful

  How to create the pattern 
  - Create an array for the pattern
  - Create an array of the boxes
  - Randomly select a box and it to the patterns array
  - Loop over the patterns array activating each box

  How monitor the pattern
  - create an event listener to listen for mousedowns
  - for each mousedown check if the block matches the one in the pattern
  - Add it to an input array
  - Update the point total.

*/

/* The Game Object */
const simon = {
  active: false,
  lights: ['green', 'red', 'blue', 'orange'],
  pattern: [],
  input: [],
  score: 0
}

const $simon = document.getElementById('simon')
const $message = document.getElementById('message')
const $start = document.getElementById('start')
const $blueSound = document.getElementById('blueSound')

// Create Sounds Object
const sounds = {
  blue: new Audio('sounds/c3.mp3'),
  red: new Audio('sounds/c2.mp3'),
  green: new Audio('sounds/c4.mp3'),
  orange: new Audio('sounds/c5.mp3')
}


/**
 * getRandomBox
 * @returns random color
 */
function getRandomColor () {
  return simon.lights[Math.floor(Math.random() * simon.lights.length)]
}

/**
 * getNextPattern
 * @returns array of colors
 */
function getNextPattern () {
  return simon.pattern.push(getRandomColor())
}

/**
 * activeLight
 * Sets a light to be on or active
 * light will deactivate after 0.2s
 */
function activeLight (light) {
  light.classList.add('active')

  playSound(light)

  setTimeout(function () {
    light.classList.remove('active')
  }, 200)
}

/**
 * playSound
 * Plays a sound based on the light provided
 * @param light
 */
function playSound (light) {
  const sound = sounds[light.id]
  if (sound) { sound.play() }
}

/**
 * resetInput
 * Resets the array holding the inputs from the player
 */
function resetInput () {
  simon.input = []
}

/**
 * displayPattern
 * This will display the current pattern 
 */
function displayPattern () {
  if (simon.active) {
    for (let i = 0; i < simon.pattern.length; i++) {
      setTimeout(function () {
        const el = document.getElementById(simon.pattern[i])
        activeLight(el)
      }, 800 * i)
    }
  }
}

/**
 * setMessage
 * Sets and displays a message
 * @param message
 */
function setMessage (message) {
  $start.classList.add('hide')
  $message.innerHTML = message
  $message.classList.remove('hide')
}


/**
 * resetGame
 * Reset game properties for a new game
 */
function resetGame () {
  simon.active = true
  simon.pattern = []
  simon.input = []
  simon.score = 0
  setMessage(simon.score)
  setMessage('')
}

/**
 * startGame
 * Starts a new game and displays a new pattern
 */
function startGame () {
  resetGame()
  getNextPattern()
  setTimeout(function () {
    displayPattern()
  }, 500)
}

/**
 * gameOver
 * Complete end game sequence.
 */
function gameOver () {
  simon.active = false
  setMessage('Game Over')
  setTimeout(function() {
    setMessage(`Final Score<br>${simon.score}`)
  }, 2000)
  setTimeout(function () {
    $start.textContent = 'Play Again?'
    $message.classList.add('hide')
    $start.classList.remove('hide')
  }, 5000)
}

/**
 * checkInput
 * used to compare the players imput with the current pattern
 * @param light
 * @param patternIndex
 */
function checkInput (light, patternIndex) {
  if (simon.pattern[patternIndex] === light) {
    simon.input.push(light)
    simon.score++
    setMessage(simon.score)
    if (simon.pattern.length === simon.input.length) {
      setTimeout(function () {
        resetInput()
        getNextPattern()
        displayPattern()
      }, 1000)
    }
  } else {
    gameOver()
  }
}


/* Adding Event Listeners */
$simon.addEventListener('mousedown', function (e) {
  if (simon.active) {
    if (e.target.classList.contains('light')) {
      activeLight(e.target)
      checkInput(e.target.id, simon.input.length)
    }
  }
})

$start.addEventListener('click', startGame)
