const leaderboards = document.getElementById('leaderboards')
const table = document.getElementById('table')
let players = JSON.parse(localStorage.getItem('players'))
let currentPlayer = ''
let currentScore = ''
let position = 0

leaderboards.addEventListener('click', (e) => {
    if (e.target.id != null) {
        document.getElementById('arrow').classList.toggle('icon--rotate')
        table.classList.toggle('table--show')
    }
})

const loadLearederboards = () => {
    const fragment = document.createDocumentFragment()
    for (let i in players) {
        const playerLeaderboard = document.createElement('div')
        const scoreLeaderboard = document.createElement('div')
        playerLeaderboard.textContent = players[i].name
        scoreLeaderboard.textContent = players[i].level
        playerLeaderboard.classList.add('player')
        scoreLeaderboard.classList.add('score')
        fragment.appendChild(playerLeaderboard)
        fragment.appendChild(scoreLeaderboard)
    }
    table.appendChild(fragment)
}

const setLeaderboards = () => {
    // Avoid bugs
    if (level == 1 && players.length != 1 && position == 0) {
        position = players.length - 1
    }

    // Check each item to see if it is bigger or smaller and sort the leaderboard
    for (let i in players) {
        if (level >= players[i].level && i != players.length - 1) {
            players.splice(position, 1)
            position = i
            players.splice(i, 0, {
                name: name,
                level: level
            })
            return 0
        }
    }

    // In case the level is te smallest only update the last element
    position = players.length - 1
    players[players.length - 1] = {
        name: name,
        level: level
    }
}

const createPlayer = () => {
    // Check if localStorage is empty and initialize it
    if (players == null) {
        players = []
    }

    // Add a new element to the end of the array
    players.push({
        name: name,
        level: level
    })

    // Update localStorage
    localStorage.setItem('players', JSON.stringify(players))
}