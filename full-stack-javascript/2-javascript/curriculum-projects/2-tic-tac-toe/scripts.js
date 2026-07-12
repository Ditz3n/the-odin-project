const Gameboard = (() => {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];
    
    const resetBoard = () => board = [["", "", ""],
                                      ["", "", ""],
                                      ["", "", ""]];
    
    const getBoard = () => board;
    
    const placeMarker = (index, mark) => {
        if (board[Math.floor(index / 3)][index % 3] !== "") return false;
        else {
            board[Math.floor(index / 3)][index % 3] = mark;
            return true;
        };
    };
    
    return { 
        resetBoard,
        getBoard, 
        placeMarker
    };
})();

const Game = (() => {
    let gameFinished = false;
    let players = [];
    let currentPlayerIndex = 0;
    
    const createPlayer = (name) => ({ name });
    
    const getCurrentTurnPlayer = () => players[currentPlayerIndex];
    
    const start = (player1, player2) => {
        player1.marker = "X";
        player2.marker = "O";
        players = [player1, player2];
        currentPlayerIndex = 0;
        gameFinished = false;
    };

    const takeTurn = (index) => {
        if (gameFinished) {
            return {
                success: false,
                mover: null,
                next: null,
                winner: null,
                gameFinished: true
            };
        }
        const currentPlayerBeforeTurn = getCurrentTurnPlayer();

        if (!Gameboard.placeMarker(index, currentPlayerBeforeTurn.marker)) {
            return {
                success: false,
                mover: currentPlayerBeforeTurn,
                next: null,
                winner: null,
                gameFinished: false
            };
        };

        currentPlayerIndex === 0 ? currentPlayerIndex++ : currentPlayerIndex--;

        if (checkWinner()) {
            gameFinished = true;
            return {
                success: true,
                mover: currentPlayerBeforeTurn,
                next: null,
                winner: currentPlayerBeforeTurn,
                gameFinished: true
            };
        };

        if (checkDraw()) {
            gameFinished = true;
            return {
                success: true,
                mover: currentPlayerBeforeTurn,
                next: null,
                winner: null,
                gameFinished: true
            };
        };

        return {
            success: true,
            mover: currentPlayerBeforeTurn,
            next: getCurrentTurnPlayer(),
            winner: null,
            gameFinished: false
        };
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        const WinPatterns = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        for (const lines of WinPatterns) {
            const [a, b, c] = lines;

            const valA = board[a[0]][a[1]];
            const valB = board[b[0]][b[1]];
            const valC = board[c[0]][c[1]];

            if (valA === valB && valB === valC && valA !== "") return true;
        };

        return false;
    };

    const checkDraw = () => {
        if (Gameboard.getBoard().flat().every((mark) => mark !== "")) return true;
        else return false;
    };

    return { 
        createPlayer,
        start,
        takeTurn,
        getCurrentTurnPlayer
    };
})();

const displayController = (() => {
    const startBtn = document.querySelector(".setup-container")
    startBtn.addEventListener("submit", (e) => {
        e.preventDefault();
        const playerOne = document.querySelector("#player-one").value;
        const playerTwo = document.querySelector("#player-two").value;
        getNamesStartGame(playerOne, playerTwo);
    })

    const getNamesStartGame = (player1, player2) => {
        const p1 = Game.createPlayer(player1);
        const p2 = Game.createPlayer(player2);
        document.querySelector(".setup-container").style.display = "none";
        Game.start(p1, p2);
        document.querySelector(".display-instructions").textContent = `It's your turn, ${Game.getCurrentTurnPlayer().name}!`;
        document.querySelector(".display-title").textContent = `${p1.name} Vs. ${p2.name}`;
        drawBoard();
    };

    const restartGame = () => {
        document.querySelector(".board-container").remove();
        document.querySelector(".display-title").textContent = "Tic Tac Toe"
        document.querySelector(".display-instructions").textContent = "";
        Gameboard.resetBoard();
        document.querySelector(".restart-btn").remove();
        document.querySelector(".setup-container").style.removeProperty("display")
    }

    const drawBoard = () => {
        const board = Gameboard.getBoard();
        const boardElmt = document.createElement("div");
        boardElmt.classList.add("board-container");
        document.querySelector(".game-section").appendChild(boardElmt);
        const restartBtn = document.createElement("button");
        restartBtn.classList.add("restart-btn");
        restartBtn.textContent = "Restart";
        restartBtn.addEventListener("click", () => {
            restartGame();
        });

        for (let i = 0; i < board.flat().length; i++) {
            const boardCell = document.createElement("button");
            boardCell.classList.add(`button-${i}`);
            boardElmt.appendChild(boardCell);
            boardCell.addEventListener("click", () => {
                const turnResult = Game.takeTurn(i);
                
                if (turnResult.mover === null) {
                    document.querySelector(".display-instructions").textContent = `Please restart the game!`;
                }
                else if (turnResult.success === false) {
                    document.querySelector(".display-instructions").textContent = `Cell occupied! Please try again...`;
                }
                else if (turnResult.gameFinished === true && turnResult.winner !== null) {
                    boardCell.textContent = turnResult.mover.marker;
                    document.querySelector(".display-title").textContent = `${turnResult.mover.name} wins!`;
                    document.querySelector(".display-instructions").textContent = `Want a rematch?`;
                    document.querySelector(".game-section").appendChild(restartBtn);
                }
                else if (turnResult.gameFinished && turnResult.winner === null) {
                    boardCell.textContent = turnResult.mover.marker;
                    document.querySelector(".display-title").textContent = `It's a draw!`;
                    document.querySelector(".display-instructions").textContent = `Want a rematch?`;
                    document.querySelector(".game-section").appendChild(restartBtn);
                }
                else {
                    boardCell.textContent = turnResult.mover.marker;
                    document.querySelector(".display-instructions").textContent = `It's your turn, ${turnResult.next.name}!`;
                };

            });
    }};

    return { drawBoard, getNamesStartGame, restartGame };
})();