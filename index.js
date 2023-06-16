const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
//this will be used to check how many cells of the grid are filled and hence keep track of the game status

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//there are only 8 ways through which a player can win the game

//now this function will initialize the game
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player: ${currentPlayer}`; 
    boxes.forEach(box => {
        box.innerText = '';
        box.style.pointerEvents = 'all';
        //also we have to remove the green color from the winning boxes
        box.classList.remove('win');
    });
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index); 
    });
});

function handleClick(index) {
    if(gameGrid[index] !== "") return;
    //this will prevent the user from overwriting the already filled cells, effectively making the cell unclickable
    gameGrid[index] = currentPlayer;
    //now as the cell is empty, we can fill it with the current player, this is for the computer to keep track of the game
    boxes[index].innerText = currentPlayer;
    //this will bring the change to UI 
    boxes[index].style.pointerEvents = 'none';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    //this will change(swap) the current player
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
    //this will update the UI with the current player in the top
    checkGameOver();
    //now this function will check the status of the game
    // that has someone won or is it a draw 
}

newGameBtn.addEventListener('click', () => {
    initGame();
    
});

function checkGameOver() {
    let answer = "";
    winningPosition.forEach(position => {
        //through this we will iterate through every postition (in winningPosition ke array) ke corresponding indices ke elements in the gameGrid array
        if(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] && gameGrid[position[0]] !== "") {
            answer = gameGrid[position[0]];
            //this will check if the current player has won the game
            //now we know these boxes are winning boxes, so we color them green
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

     //now we will disable the click event on these boxes
    //so that the game is ended and we now display the new Game btn 

    if(answer !== "") {
        //this means that "answer" has won the game
        gameInfo.innerText = `${answer} has won the game!`;
        newGameBtn.classList.add('active');
        //disabling the click event on the boxes, because the game we have the winner
        boxes.forEach(box => {
            box.style.pointerEvents = 'none';
        });
        return;
    }

    //now we will check if the game is a draw
    // there are 2 methods to do this 
    // 1. we can check if the gameGrid array is full and then if it is full, and no condition is hit, then it is a draw
    // 2. We can run a foreach loop on the gamegrid array and check if there is any empty cell, if there is no empty cell, then it is a draw
    // we will use the second method and find out
    // let draw = true;
    // gameGrid.forEach(cell => {
    //     if(cell === "") {
    //         draw = false;
    //     }
    // });

    let draw = !(gameGrid.includes(""));
    // console.log(draw);
    //this will return true if there is no empty cell in the gameGrid array


    if(draw) {
        gameInfo.innerText = `It's a draw!`;
        newGameBtn.classList.add('active');
        //disabling the click event on the boxes, because the game we have the winner
        boxes.forEach(box => {
            box.style.pointerEvents = 'none';
        });
        return;
    }


}