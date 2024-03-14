import { test, expect } from '@jest/globals'
import TicTacToe, { Symbol } from './game';

test('should create a game successfully', () => {
    const expectedBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    
    const expectedPlayers = new Map([
        [Symbol.X, "Player 1"],
        [Symbol.O, "Player 2"]
    ])

    const game = new TicTacToe();
    expect(game.board).toEqual(expectedBoard);
    expect(game.players).toEqual(expectedPlayers);
    expect(game.currenctPlayer).toBe(Symbol.X);
    expect(game.turns).toHaveLength(0);
    expect(game.winner).toBeNull();
});

test('should set player name successfully', () => {
    const game = new TicTacToe()
    expect(game.getPlayerName(Symbol.X)).toBe("Player 1")
    expect(game.getPlayerName(Symbol.O)).toBe("Player 2")

    game.setPlayerName(Symbol.X, 'Player X')
    expect(game.getPlayerName(Symbol.X)).toBe("Player X")
    expect(game.getPlayerName(Symbol.O)).toBe("Player 2")

    game.setPlayerName(Symbol.O, 'Player O')
    expect(game.getPlayerName(Symbol.X)).toBe("Player X")
    expect(game.getPlayerName(Symbol.O)).toBe("Player O")
})

test('should mark a square successfully', () => {
    let expectedBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    const game = new TicTacToe();
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Symbol.X);
    expect(game.turns).toHaveLength(0);

    expectedBoard = [
        [Symbol.X, null, null],
        [null, null, null],
        [null, null, null]
    ]
    game.markSquare(0, 0)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Symbol.O);
    expect(game.turns).toHaveLength(1);
    expect(game.turns[0]).toBe('Player 1 marks X in square at position (0,0)');

    expectedBoard = [
        [Symbol.X, null, null],
        [null, Symbol.O, null],
        [null, null, null]
    ]
    game.markSquare(1, 1)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Symbol.X);
    expect(game.turns).toHaveLength(2);
    expect(game.turns[1]).toBe('Player 2 marks O in square at position (1,1)');

    expectedBoard = [
        [Symbol.X, null, null],
        [null, Symbol.O, null],
        [null, null, Symbol.X]
    ]
    game.markSquare(2, 2)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Symbol.O);
    expect(game.turns).toHaveLength(3);
    expect(game.turns[2]).toBe('Player 1 marks X in square at position (2,2)');
});

test('should not mark a square with invalid postion indexes', () => {
    const game = new TicTacToe();
    expect(() => game.markSquare(-1, 0)).toThrow('position indexes must be greater or equal than 0')
    expect(() => game.markSquare(0, -1)).toThrow('position indexes must be greater or equal than 0')
    expect(() => game.markSquare(3, 0)).toThrow('position indexes must be smaller than 3')
    expect(() => game.markSquare(0, 3)).toThrow('position indexes must be smaller than 3')
});

test('should not mark a square already marked', () => {
    const game = new TicTacToe();
    game.markSquare(0, 0)
    expect(() => game.markSquare(0, 0)).toThrow('square at position (0,0) is not empty')
});

test('should have a winner', () => {
    const expectedBoards = [
        [
            [Symbol.X, Symbol.O, null],
            [Symbol.X, Symbol.O, null],
            [Symbol.X, null, null]
        ],
        [
            [null, Symbol.X, Symbol.O],
            [null, Symbol.X, Symbol.O],
            [null, Symbol.X, null]
        ],
        [
            [Symbol.O, null, Symbol.X],
            [Symbol.O, null, Symbol.X],
            [null, null, Symbol.X]
        ],
        [
            [Symbol.O, Symbol.O, Symbol.O],
            [Symbol.X, null, null],
            [null, Symbol.X, Symbol.X]
        ],
        [
            [Symbol.X, null, null],
            [Symbol.O, Symbol.O, Symbol.O],
            [null, Symbol.X, Symbol.X]
        ],
        [
            [Symbol.X, null, null],
            [null, Symbol.X, Symbol.X],
            [Symbol.O, Symbol.O, Symbol.O]
        ],
        [
            [Symbol.X, null, null],
            [null, Symbol.X, null],
            [Symbol.O, Symbol.O, Symbol.X]
        ],
        [
            [Symbol.X, null, Symbol.O],
            [null, Symbol.O, null],
            [Symbol.O, Symbol.X, Symbol.X]
        ],
    ]

    for (const expectedBoard of expectedBoards) {
        const game = new TicTacToe();
        const turns = extractTurnsFromBoard(expectedBoard)

        let currentPlayer;
        while(turns.get(Symbol.X).length > 0 || turns.get(Symbol.O).length > 0) {
            currentPlayer = currentPlayer == Symbol.X ? Symbol.O : Symbol.X
            expect(game.currenctPlayer).toBe(currentPlayer);
            expect(game.winner).toBeNull;
            game.markSquare(...turns.get(currentPlayer).pop())
        }
        expect(game.currenctPlayer).toBeNull();
        expect(game.winner).toBe(currentPlayer);
        expect(game.board).toEqual(expectedBoard);
    }
});

function extractTurnsFromBoard(board) {
    const turns = new Map()
    turns.set(Symbol.X, [])
    turns.set(Symbol.O, [])

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] == Symbol.X) {
                turns.get(Symbol.X).push([x,y])
            } else if (board[x][y] == Symbol.O) {
                turns.get(Symbol.O).push([x,y])
            }
        }
    }
    return turns 
}