export class Square {
    static EMPTY = new Square();
    static X = new Square('X');
    static O = new Square('O');

    constructor(value = 'EMPTY') {
        this.value = value
    }
}

export default class TicTacToe {
    constructor() {
        this.board = [
            [Square.EMPTY, Square.EMPTY, Square.EMPTY],
            [Square.EMPTY, Square.EMPTY, Square.EMPTY],
            [Square.EMPTY, Square.EMPTY, Square.EMPTY]
        ]
        this.players = new Map()
        this.players.set(Square.X, 'Player 1')
        this.players.set(Square.O, 'Player 2')
        this.currenctPlayer = Square.X
        this.turns = []
        this.winner = null
    }

    markSquare(x, y) {
        if (this.winner) {
            throw new Error('the game is over');
        }
        if (x < 0 || y < 0) {
            throw new Error(`position indexes must be greater or equal than 0`);
        }
        if (x >= this.board.length || y >= this.board.length) {
            throw new Error(`position indexes must be smaller than ${this.board.length}`);
        }
        if (this.board[x][y] != Square.EMPTY) {
            throw new Error(`square at position (${x},${y}) is not empty`);
        }

        this.board[x][y] = this.currenctPlayer
        this.turns.push(`${this.players.get(this.currenctPlayer)} marks ${this.currenctPlayer.value} in square at position (${x},${y})`) 

        if (checkWinner(this.board)) {
            this.winner = this.currenctPlayer
            this.currenctPlayer = null
        } else {
            this.currenctPlayer = this.currenctPlayer == Square.X ? Square.O : Square.X
        }
    }
}

function checkWinner(board) {
    const winnerPositions = [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]],
    ]

    for (let i = 0; i < winnerPositions.length; i++) {
        let lastPosition;
        let hasWinner = true
        for (let j = 0; j < winnerPositions[i].length; j++) {
            const [x,y] = winnerPositions[i][j]
            if (!lastPosition) {
                hasWinner = hasWinner && board[x][y] != Square.EMPTY
            } else {
                hasWinner = hasWinner && board[x][y] == board[lastPosition[0]][lastPosition[1]]
            }
            lastPosition = winnerPositions[i][j]
        }
        if (hasWinner) {
            return true
        }
    }
    return false
}