import { useState } from "react";

export class Symbol {
    static X = new Symbol('X');
    static O = new Symbol('O');

    constructor(value) {
        this.value = value
    }
}

export function useGame() {
    const [state,setState] = useState({
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        players: new Map([
            [Symbol.X, 'Player 1'],
            [Symbol.O, 'Player 2']
        ]),
        currentPlayer: Symbol.X,
        turns: [],
        winner: null,
        gameOver: false,
    })

    function setPlayerName(symbol, name) {
        state.players.set(symbol, name)
        setState({...state})
    }

    function getPlayerName(symbol) {
        return state.players.get(symbol)
    }

    function getWinnerName() {
        if (state.gameOver && state.winner) {
            return getPlayerName(state.winner)
        }
        return null
    }

    function rematch() {
        setState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            players: new Map([
                [Symbol.X, 'Player 1'],
                [Symbol.O, 'Player 2']
            ]),
            currentPlayer: Symbol.X,
            turns: [],
            winner: null,
            gameOver: false,
        })
    }

    function markSquare(x, y) {
        if (state.gameOver) {
            throw new Error('the game is over');
        }
        if (x < 0 || y < 0) {
            throw new Error(`position indexes must be greater or equal than 0`);
        }
        if (x >= state.board.length || y >= state.board.length) {
            throw new Error(`position indexes must be smaller than ${state.board.length}`);
        }
        if (state.board[x][y]) {
            throw new Error(`square at position (${x},${y}) is not empty`);
        }

        state.board[x][y] = state.currentPlayer
        state.turns.push(`${state.players.get(state.currentPlayer)} marks ${state.currentPlayer.value} in square at position (${x},${y})`) 

        if (checkWinner(state.board)) {
            state.winner = state.currentPlayer
            state.currentPlayer = null
            state.gameOver = true
        } else if (state.turns.length == (state.board.length*state.board.length)) {
            state.currentPlayer = null
            state.gameOver = true
        } else {
            state.currentPlayer = state.currentPlayer == Symbol.X ? Symbol.O : Symbol.X
        }
        setState({...state})
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

    return {...state, setPlayerName, getPlayerName, markSquare, getWinnerName, rematch}
}