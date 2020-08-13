const main = document.getElementById('main')
const start = document.getElementById('start')
const levelHTML = document.getElementById('level')

let pattern = []
let userSlected = []
let on = false
let index = 0
let level = 0

main.addEventListener('click', (e) => {
    if (e.target.id == "start") {
        levelHTML.style.display = 'block'
        console.log('start')
        e.target.disabled = true
        setColor()
    } else if (e.target.id == 'green') {
        userSlected.push('green')
        validate()
    } else if (e.target.id == 'red') {
        userSlected.push('red')
        validate()
    } else if (e.target.id == 'yellow') {
        userSlected.push('yellow')
        validate()
    } else if (e.target.id == 'blue') {
        userSlected.push('blue')
        validate()
    }
})

const setColor = () => {
    level += 1
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
        console.log(pattern)
        if (index >= pattern.length) {
            index = 0
            on = false
            start.innerHTML = 'Select'
            document.getElementById('green').classList.add('green__enabled')
            document.getElementById('red').classList.add('red__enabled')
            document.getElementById('yellow').classList.add('yellow__enabled')
            document.getElementById('blue').classList.add('blue__enabled')
            clearInterval(timer)
        } else {
            if (on) {
                document.getElementById(pattern[index]).classList.remove(`${pattern[index]}__light`)
                console.log('off')
                on = false
                index += 1
            } else {
                document.getElementById(pattern[index]).classList.add(`${pattern[index]}__light`)
                console.log('on')
                on = true
            }
        }
    }, 1000)
}

const validate = () => {
    let current = userSlected.length - 1
    if (userSlected[current] == pattern[current]) {
        console.log('correct')
        current += 1
    } else {
        current = 0
        start.innerHTML = 'Error'
        console.log('error')
    }

    if (current == pattern.length) {
        start.disabled = false
        start.innerHTML = 'Correct'
        userSlected = []
        document.getElementById('green').classList.remove('green__enabled')
        document.getElementById('red').classList.remove('red__enabled')
        document.getElementById('yellow').classList.remove('yellow__enabled')
        document.getElementById('blue').classList.remove('blue__enabled')
        setTimeout('setColor()', 1000)
    }
}