export class Symbol {
    static X = new Symbol('X');
    static O = new Symbol('O');

    constructor(value) {
        this.value = value
    }
}

export default class TicTacToe {
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        this.players = new Map()
        this.players.set(Symbol.X, 'Player 1')
        this.players.set(Symbol.O, 'Player 2')
        this.currenctPlayer = Symbol.X
        this.turns = []
        this.winner = null
    }

    setPlayerName(symbol, name) {
        this.players.set(symbol, name)
    }

    getPlayerName(symbol) {
        return this.players.get(symbol)
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
        if (this.board[x][y]) {
            throw new Error(`square at position (${x},${y}) is not empty`);
        }

        this.board[x][y] = this.currenctPlayer
        this.turns.push(`${this.players.get(this.currenctPlayer)} marks ${this.currenctPlayer.value} in square at position (${x},${y})`) 

        if (checkWinner(this.board)) {
            this.winner = this.currenctPlayer
            this.currenctPlayer = null
        } else {
            this.currenctPlayer = this.currenctPlayer == Symbol.X ? Symbol.O : Symbol.X
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
                hasWinner = hasWinner && board[x][y]
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