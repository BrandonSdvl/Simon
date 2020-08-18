const main = document.getElementById('main')
const start = document.getElementById('start')
const levelHTML = document.getElementById('level')
const startConfirm = document.getElementById('startConfirm')
const input = document.getElementById('input')
const select = document.getElementById('select')

let pattern = []
let userSlected = []
let on = false
let index = 0
let level = 0
let enabled = false
let time = 500
let gameOver = false
let name = ''
let dificult = ''

loadLearederboards()

main.addEventListener('click', (e) => {
    if (e.target.id == 'start') {
        e.target.disabled = true
        document.getElementById('lightbox').classList.add('lightbox--show')
    }
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
    e.preventDefault()
    name = input.value
    dificult = select[select.selectedIndex].value

    if (form.checkValidity()) {
        levelHTML.style.display = 'block'
        gameOver = false
        document.getElementById('lightbox').classList.remove('lightbox--show')
        createPlayer()
        switch (dificult) {
            case 'easy':
                time = 1000
                break
            case 'medium':
                time = 600
                break
            case 'hard':
                time = 200
                break
        }
        setTimeout('setColor()', 500)
    } else if (name == '') {
        alert('Insert a name')
    }
})

const setColor = () => {
    level += 1
    setLeaderboards()
    localStorage.setItem('players', JSON.stringify(players))
    table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>'
    loadLearederboards()
    start.innerHTML = '...'
    levelHTML.firstElementChild.innerHTML = level
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
            console.log(pattern)
            index = 0
            on = false
            start.innerHTML = 'Select'
            document.getElementById('green').classList.add('green__enabled')
            document.getElementById('red').classList.add('red__enabled')
            document.getElementById('yellow').classList.add('yellow__enabled')
            document.getElementById('blue').classList.add('blue__enabled')
            enabled = true
            clearInterval(timer)
        } else {
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
    let current = userSlected.length - 1
    if (userSlected[current] == pattern[current]) {
        current += 1
    } else {
        start.disabled = false
        current = 0
        start.innerHTML = 'Error'
        gameOver = true
        reset()
    }

    if (current == pattern.length && !gameOver) {
        start.innerHTML = 'Correct'
        userSlected = []
        document.getElementById('green').classList.remove('green__enabled')
        document.getElementById('red').classList.remove('red__enabled')
        document.getElementById('yellow').classList.remove('yellow__enabled')
        document.getElementById('blue').classList.remove('blue__enabled')
        enabled = false
        setTimeout('setColor()', time)
    }
}

const reset = () => {
    pattern = []
    userSlected = []
    level = 0
    start.innerHTML = 'Start'
    levelHTML.firstElementChild.innerHTML = level
    levelHTML.style.display = 'none'
    currentPlayer = ''
    currentScore = ''
    position = 0
    players = JSON.parse(localStorage.getItem('players'))
    table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>'
    loadLearederboards()
}