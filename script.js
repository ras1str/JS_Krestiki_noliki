let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

//Define game variables 
let player = 1
let gameOver = false

// pull in cell from dom 

const cellEmlements = document.querySelectorAll('.cell')
const resultElement = document.getElementById('result')
const restartButton = document.getElementById('restart')



// Add eventLisneter 

cellEmlements.forEach((cell, index) => {

    cell.addEventListener('click', () => {
        placeMarker(index)


    })

})

// create function for placing markers

function placeMarker(index) {

    let col = index % 3
    let row = (index - col) / 3
    //check current cell is empty 

    if (boardData[row][col] === 0 && gameOver == false ) {

        boardData[row][col] = player
        //change player
        player *= -1
    }

    drawMarkers()

    // check if anyone is won 
    checkResult()
}


const drawMarkers = () => {
    // iter over rows 
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {

            // check if it is player 1 marker 
            if (boardData[row][col] == 1) {
                //update cell class to cross 
                cellEmlements[(row * 3) + col].classList.add('cross')
            }
            if (boardData[row][col] === -1) {
                cellEmlements[(row * 3) + col].classList.add('circle')

            }
        }

    }

}


const checkResult = () => {

    // check rows and col 
    for (let i = 0; i < 3; i++) {

        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2]
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i]
        if (rowSum === 3 || colSum === 3) {
            
            endGame(1)
            return
        } else if (rowSum === -3 || colSum === -3) {
            endGame(2)
            return
        }
    }

    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2]
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0]
    if (diagonalSum1 === 3 || diagonalSum2 === 3) {
        
        endGame(1)
        return
    } else if (diagonalSum1 === -3 || diagonalSum2 === -3) {
        endGame(2)
        return
        
    }
    // Tie 
    if (boardData[0].indexOf(0) === -1 && boardData[1].indexOf(0) === -1 && boardData[2].indexOf(0) === -1) {
        endGame(0)
        return
    }
} 

// gameOver function 

const endGame = (winner) => {

    gameOver = true
    if(winner == 0) {
        resultElement.innerText = `Tie`

    }
    else{
        resultElement.innerText = ` Player ${winner} wins `
    }

}

// Restart 



    
    restartButton.addEventListener("click", () =>{
        
        boardData = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        
        //Define game variables 
         player = 1
         gameOver = false
        
        //reset gameboard 

      cellEmlements.forEach(cell => {

        cell.classList.remove('cross', 'circle')
        resultElement.innerHTML = ''

      })

    })



