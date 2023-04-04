let Turn = 'x'
let Won = false

let Wins = {
    x:0,
    o:0,
    tie:0
}

const BoardButtons = document.querySelectorAll('.Board-Piece')
const Restart = document.getElementById('Restart')
const GameInput = document.getElementById('GameInput')
const Stats = document.getElementById('Stats')

Stats.textContent = `X has won ${Wins.x} times, O has won ${Wins.o} times & we've had ${Wins.tie} ties!`

const Colors = {
    Active:'rgb(22, 22, 22)',
    Inactive:'rgb(32, 32, 32)',
    Won:'rgb(73, 194, 128)',
    x:'rgb(209, 47, 47)',
    o:'rgb(47, 177, 209)'
}

let Board = [
    'Empty', 'Empty', 'Empty',
    'Empty', 'Empty', 'Empty',
    'Empty', 'Empty', 'Empty'
]

function VisualizeVictory(arr){
    BoardButtons[arr[0]].style.backgroundColor = Colors.Won
    BoardButtons[arr[1]].style.backgroundColor = Colors.Won
    BoardButtons[arr[2]].style.backgroundColor = Colors.Won
}

function CheckFull(){
    if (Board[0] !== 'Empty' && Board[1] !== 'Empty' && Board[2] !== 'Empty' && Board[3] !== 'Empty' && Board[4] !== 'Empty' && Board[5] !== 'Empty' && Board[6] !== 'Empty' && Board[7] !== 'Empty' && Board[8] !== 'Empty') {
        return true
    }
    return false
}

function CheckBoard(Player){
    console.log(Board, Player)

    if (Board[0] === Player && Board[1] === Player && Board[2] === Player) {
        //victory by first row
        VisualizeVictory([0,1,2])
        return true
    } else if (Board[3] === Player && Board[4] === Player && Board[5] === Player) {
        //victory by second row
        VisualizeVictory([3,4,5])
        return true
    } else if (Board[6] === Player && Board[7] === Player && Board[8] === Player) {
        //victory by third row
        VisualizeVictory([6,7,8])
        return true
    }

    else if (Board[0] === Player && Board[4] === Player && Board[8] === Player) {
        //Victory by X from 1 to 9
        VisualizeVictory([0,4,8])
        return true
    } else if (Board[2] === Player && Board[4] === Player && Board[6] === Player) {
        //Victory by X from 3 to 7
        VisualizeVictory([2,4,6])
        return true
    }

    else if (Board[0] === Player && Board[3] === Player && Board[6] === Player) {
        //Victory by vertical 1 to 7
        VisualizeVictory([0,3,6])
        return true
    } else if (Board[1] === Player && Board[4] === Player && Board[7] === Player) {
        //Victory by vertical 2 to 8
        VisualizeVictory([1,4,7])
        return true
    } else if (Board[2] === Player && Board[5] === Player && Board[8] === Player) {
        //Victory by vertical 3 to 9
        VisualizeVictory([2,5,8])
        return true
    }
    return false
}

BoardButtons.forEach((Obj) => {
    Obj.addEventListener('click', (e) => {
        if (Won === false) {
            let ID = Obj.getAttribute('id')
            if (Board[ID] === 'Empty') { //Check if it's empty
                Board[ID] = Turn
                Obj.textContent = Turn
                Obj.style.color = Colors[Turn]
                Obj.style.backgroundColor = Colors.Inactive
                let Check = CheckBoard(Turn)
                if (Check === false) {
                    if (Turn === 'x') {
                        Turn = 'o'
                    } else if (Turn === 'o') {
                        Turn = 'x'
                    }
                    GameInput.textContent = `Player ${Turn}'s Turn!`
                } else if (Check === true) {
                    Won = true
                    Wins[Turn]+=1
                    GameInput.textContent = `Player ${Turn} Wins!`
                }
                let DoubleCheck = CheckFull()
                if (DoubleCheck === true && Won === false) {
                    Won = true
                    GameInput.textContent = 'Oh no! Board ran out of space! Restart!'
                    Wins.tie+=1
                }
                Stats.textContent = `X has won ${Wins.x} times, O has won ${Wins.o} times & we've had ${Wins.tie} ties!`
            }
        }
    })
});

Restart.addEventListener('click', (e) => { //Reset the board & game
    Board = [
        'Empty', 'Empty', 'Empty',
        'Empty', 'Empty', 'Empty',
        'Empty', 'Empty', 'Empty'
    ]
    BoardButtons.forEach((Obj)=>{
        Obj.textContent = ''
        Obj.style.backgroundColor = Colors.Active
    })
    Turn = 'x'
    Won = false
    GameInput.textContent = `Player ${Turn}'s Turn!`
});