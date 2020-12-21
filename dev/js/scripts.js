const main = document.getElementById('main')
const start = document.getElementById('start')
const levelHTML = document.getElementById('level')
const nameHTML = document.getElementById('name')
const titles = document.getElementById('titles')
const startConfirm = document.getElementById('startConfirm')
const input = document.getElementById('input')
const select = document.getElementById('select')
const modalEnd = document.getElementById('modalEnd')
const nameEnd = document.getElementById('nameEnd')
const scoreEnd = document.getElementById('scoreEnd')
const restart = document.getElementById('restart')
const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')

// Create an array to save the pattern and another to store the colors selected by the user, and then perform a check comparing each element in the array created by the random function and the colors selected by the player
let pattern = []
let userSlected = []

let on = false
let index = 0
let level = 0
let enabled = false
let time = 500
let gameOver = false
let name = ''
let speed = ''

// Initialize the leaderboards
loadLearederboards()

main.addEventListener('click', (e) => {
    if (e.target.id === 'start') {
        e.target.disabled = true
        document.getElementById('lightbox').classList.add('lightbox--show')
    }
    // Store the color selected by the user and perform the validation
    if (enabled) {
        switch (e.target.id) {
            case 'green':
                userSlected.push('green')
                break
            case 'red':
                userSlected.push('red')
                break
            case 'yellow':
                userSlected.push('yellow')
                break
            case 'blue':
                userSlected.push('blue')
                break
            default:
                break;
        }
        validate()
    }
})

startConfirm.addEventListener('click', (e) => {
    // Initialize variables
    e.preventDefault()
    name = input.value
    nameHTML.textContent = name
    speed = select[select.selectedIndex].value

    if (name !== "") {
        titles.style.display = 'flex'
        gameOver = false
        input.value = ''
        select.selectedIndex = 0
        document.getElementById('lightbox').classList.remove('lightbox--show')
        createPlayer()
        switch (speed) {
            case 'slow':
                time = 1000
                break
            case 'medium':
                time = 600
                break
            case 'fast':
                time = 200
                break
        }
        setTimeout('setColor()', 500)
    } else if (name === '') {
        alert('Insert a name')
    }
})

const setColor = () => {
    // Update the leaderboard and the level
    level += 1
    setLeaderboards()
    localStorage.setItem('players', JSON.stringify(players))
    table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>'
    loadLearederboards()
    start.textContent = '...'
    levelHTML.firstElementChild.textContent = level
    // Generate the random pattern
    let color = Math.floor(Math.random() * 4) + 1
    switch (color) {
        case 1:
            pattern.push('green')
            break
        case 2:
            pattern.push('red')
            break
        case 3:
            pattern.push('yellow')
            break
        case 4:
            pattern.push('blue')
            break
    }

    const timer = setInterval(() => {
        if (index >= pattern.length) {
            index = 0
            on = false
            start.textContent = 'Select'
            green.classList.add('green__enabled')
            red.classList.add('red__enabled')
            yellow.classList.add('yellow__enabled')
            blue.classList.add('blue__enabled')
            enabled = true
            clearInterval(timer)
        } else {
            // Turn item on/off according to pattern
            if (on) {
                document.getElementById(pattern[index]).classList.remove(`${pattern[index]}__light`)
                on = false
                index += 1
            } else {
                document.getElementById(pattern[index]).classList.add(`${pattern[index]}__light`)
                on = true
            }
        }
    }, time)
}

const validate = () => {
    // Validate if the color selected by the user is correct according to the pattern
    let current = userSlected.length - 1
    if (userSlected[current] === pattern[current]) {
        current += 1
    } else {
        start.disabled = false
        current = 0
        start.textContent = 'Error'
        gameOver = true
        nameEnd.textContent = name
        scoreEnd.textContent = level
        modalEnd.classList.add('lightbox--show')
    }

    // Validate if it is the last element to selected and turn on the pattern
    if (current === pattern.length && !gameOver) {
        start.textContent = 'Correct'
        userSlected = []
        green.classList.remove('green__enabled')
        red.classList.remove('red__enabled')
        yellow.classList.remove('yellow__enabled')
        blue.classList.remove('blue__enabled')
        enabled = false
        setTimeout('setColor()', time)
    }
}

const reset = () => {
    pattern = []
    userSlected = []
    name = ""
    enabled = false
    level = 0
    start.textContent = 'Start'
    levelHTML.firstElementChild.textContent = level
    titles.style.display = 'none'
    currentPlayer = ''
    currentScore = ''
    position = 0
    players = JSON.parse(localStorage.getItem('players'))
    green.classList.remove('green__enabled')
    red.classList.remove('red__enabled')
    yellow.classList.remove('yellow__enabled')
    blue.classList.remove('blue__enabled')
    table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>'
    loadLearederboards()
}

restart.addEventListener('click', () => {
    reset()
    modalEnd.classList.remove('lightbox--show')
})