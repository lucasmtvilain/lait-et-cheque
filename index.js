//Var for read in the console
var colors = require('colors');
var readline = require('readline');
// chess bord
const chess = require('chess');
//logger
var log = console.log;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var tourIA = Math.floor(Math.random() * Math.floor(2));

if (tourIA == 1) {
    console.log("Vous etes les NOIRS")
} else {
    console.log("Vous etes les BLANCS")
}

// create a game client
const gameClient = chess.create();
let move, status;
// capture check and checkmate events
gameClient.on('check', (attack) => {
    // get more details about the attack on the King
    console.log(attack);
});
// look at the status and valid moves
status = gameClient.getStatus();


function displayBoard(board) {
    let boardString = "    A  B  C  D  E  F  G  H\n";
    let boardSquares = board.squares;
    let isBlackCase = true;
    let pieceValue = null;




    for (i in boardSquares) {


        if (i % 8 == 0)
            boardString += " " + (i/8 + 1) + " ";

        pieceValue = "   ";
        if (boardSquares[i].piece != null) {
            if (boardSquares[i].piece.notation == "") {
                pieceValue = " P ";
            } else {
                pieceValue = " " + boardSquares[i].piece.notation + " ";
            }

            if (boardSquares[i].piece.side.name == "white") {
                pieceValue = colors.white.bold(pieceValue);
            } else {
                pieceValue = colors.black(pieceValue);
            }


        }




        if (isBlackCase) {
            boardString += colors.bgYellow(pieceValue);
        } else {
            boardString += colors.bgBlue(pieceValue);
        }

        if (boardSquares[i].file == 'h') {
            boardString += "\n";
        } else {
            isBlackCase = !isBlackCase;
        }


    }

    console.log(boardString);
}


////////////////////Read the inputs/////////////////////////////

var recursiveAsyncReadLine = function () {

    if (tourIA == 1) {
        tourIA = 0;
        var moveIa = RandomMove();
        gameClient.move(moveIa);
        console.log("IA a joué : "+moveIa)
        recursiveAsyncReadLine();
    } else {
        displayBoard(status.board);

        rl.question('Deplace ton pion on te dit !!! ', function (answer) {
            if (answer == 'exit') //we need some base case, for recursion
                return rl.close(); //closing RL and returning from function.
            else if (answer == "?") {
                MoveDispo();
            } else if (checkMove(answer)) {
                gameClient.move(answer);
                tourIA = 1;
            } else {
                console.log('delacement interdit :(');
            }

            // Continue the game
            if (status.isCheckmate == false) {
                recursiveAsyncReadLine(); //Calling this function again to ask new question
            }
        });
    }

};


// revoie true si le deplacement est valide
function checkMove(move) {
    var movevalids = gameClient.getStatus();

    for (i in movevalids.notatedMoves) {
        if (i == move) {
            return true;
        }
    }
    return false;
}

function MoveDispo() {
    var movevalids = gameClient.getStatus();


    for (i in movevalids.notatedMoves) {
        console.log(i);
    }
    RandomMove();
}

/// random move ////
function RandomMove() {
    var movevalids = gameClient.getStatus();
    var listMove = [];
    var index = 0;
    for (i in movevalids.notatedMoves) {
        listMove.push({move: i});
        index++;
    }
    return listMove[Math.floor(Math.random() * Math.floor(index))].move;
}

recursiveAsyncReadLine(); //we have to actually start our recursion somehow