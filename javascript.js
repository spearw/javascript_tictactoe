const gameboard = (() => {

    let grid = [
        "", "", "",
        "", "", "",
        "", "", ""
      ];


    return {
      grid,
    };
})();


const displayController = (() => {

    const updateBoard = (index) => {
        document.getElementById(index).innerHTML = gameboard.grid[index];
    }

    const resetBoard = () => {
        gameSquares = document.getElementsByClassName("gameSquare")
        for (var i = 0; i < gameSquares.length; i++){
            gameSquares[i].innerHTML = "";
        }
    }

    const indicateTurn = (xturn) => {
        if (xturn){
            document.getElementById("turnIndicator").innerHTML = "X"
        }
        else{
            document.getElementById("turnIndicator").innerHTML = "O"
        }
    }
    return {
        updateBoard,
        resetBoard,
        indicateTurn
    };
})();

const gameController = (() => {

    let xturn = true;
    let winConditions = [
        //horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //diagonal
        [0, 4, 8],
        [2, 4, 6]
    ]


    const swapTurns = () => {
        xturn = !xturn;
        displayController.indicateTurn(xturn);
    } 

    const validMove = (index) =>{
        if (gameboard.grid[index] == ""){
            return true
        }
        else{
            return false
        }
    }

    const takeTurn = (index) =>  {
        placePiece(index);
        swapTurns();
        displayController.updateBoard(index); 
        //setTimeout ensures that the board updates before the gameover popup appears
        setTimeout(gameOver, 5);
    }

    const placePiece = (index) => {
        if (validMove(index)){

            if (xturn){
                gameboard.grid[index] = "x";
                
            }
            else{
                gameboard.grid[index] = "o"
            }
        }
    }

    const resetGame = () => {
        gameboard.grid = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];

        displayController.resetBoard();
        xturn = true;
        document.getElementById("victoryMessage").innerHTML = ""
        document.getElementById("turnIndicator").innerHTML = "X"      
        
        
        gameSquares = document.getElementsByClassName("gameSquare")
        for (var i = 0; i < gameSquares.length; i++){
            gameSquares[i].disabled = false;
        }
        
    }

    const gameOver = () => {

        winConditions.forEach(function(condition) {
            
            if (gameboard.grid[condition[0]] == gameboard.grid[condition[1]] && gameboard.grid[condition[0]] == gameboard.grid[condition[2]] && (gameboard.grid[condition[0]] == "x" || gameboard.grid[condition[0]] == "o")) {
                if (gameboard.grid[condition[0]] == "x"){
                    document.getElementById("victoryMessage").innerHTML = "X Wins!"
                    gameSquares = document.getElementsByClassName("gameSquare")
                    for (var i = 0; i < gameSquares.length; i++){
                        gameSquares[i].disabled = true;
                    }
                }
                else {
                    document.getElementById("victoryMessage").innerHTML = "O Wins!"
                    gameSquares = document.getElementsByClassName("gameSquare")
                    for (var i = 0; i < gameSquares.length; i++){
                        gameSquares[i].disabled = true;
                    }
                }
            }
            else if (gameboard.grid.some(function(gameSquare){
                return gameSquare == ""
            })){
                //squares still empty

            }
            else{
                document.getElementById("victoryMessage").innerHTML = "It's a tie"
                gameSquares = document.getElementsByClassName("gameSquare")
                for (var i = 0; i < gameSquares.length; i++){
                    gameSquares[i].disabled = true;
                }
            }
        });
    }

    return {
      takeTurn,
      resetGame,
    };
})();

document.getElementById("0").addEventListener("click", function(){
    gameController.takeTurn(0);
}, false);
document.getElementById("1").addEventListener("click", function(){
    gameController.takeTurn(1);
}, false);
document.getElementById("2").addEventListener("click", function(){
    gameController.takeTurn(2);
}, false);
document.getElementById("3").addEventListener("click", function(){
    gameController.takeTurn(3);
}, false);
document.getElementById("4").addEventListener("click", function(){
    gameController.takeTurn(4);
}, false);
document.getElementById("5").addEventListener("click", function(){
    gameController.takeTurn(5);
}, false);
document.getElementById("6").addEventListener("click", function(){
    gameController.takeTurn(6);
}, false);
document.getElementById("7").addEventListener("click", function(){
    gameController.takeTurn(7);
}, false);
document.getElementById("8").addEventListener("click", function(){
    gameController.takeTurn(8);
}, false);

document.getElementById("newgame").addEventListener("click", function(){
    gameController.resetGame();
}, false);
document.getElementById("ai").addEventListener("click", function(){
    
}, false);
