import { test, expect } from '@jest/globals'
import TicTacToe, { Square } from './game';
import exp from 'constants';

test('should create a game successfully', () => {
    const expectedBoard = [
        [Square.EMPTY, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY]
    ]
    
    const expectedPlayers = new Map([
        [Square.X, "Player 1"],
        [Square.O, "Player 2"]
    ])

    const game = new TicTacToe();
    expect(game.board).toEqual(expectedBoard);
    expect(game.players).toEqual(expectedPlayers);
    expect(game.currenctPlayer).toBe(Square.X);
    expect(game.turns).toHaveLength(0);
    expect(game.winner).toBeNull();
});

test('should mark a square successfully', () => {
    let expectedBoard = [
        [Square.EMPTY, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY]
    ]

    const game = new TicTacToe();
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Square.X);
    expect(game.turns).toHaveLength(0);

    expectedBoard = [
        [Square.X, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY]
    ]
    game.markSquare(0, 0)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Square.O);
    expect(game.turns).toHaveLength(1);
    expect(game.turns[0]).toBe('Player 1 marks X in square at position (0,0)');

    expectedBoard = [
        [Square.X, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.O, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.EMPTY]
    ]
    game.markSquare(1, 1)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Square.X);
    expect(game.turns).toHaveLength(2);
    expect(game.turns[1]).toBe('Player 2 marks O in square at position (1,1)');

    expectedBoard = [
        [Square.X, Square.EMPTY, Square.EMPTY],
        [Square.EMPTY, Square.O, Square.EMPTY],
        [Square.EMPTY, Square.EMPTY, Square.X]
    ]
    game.markSquare(2, 2)
    expect(game.board).toEqual(expectedBoard);
    expect(game.currenctPlayer).toBe(Square.O);
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
            [Square.X, Square.O, Square.EMPTY],
            [Square.X, Square.O, Square.EMPTY],
            [Square.X, Square.EMPTY, Square.EMPTY]
        ],
        [
            [Square.EMPTY, Square.X, Square.O],
            [Square.EMPTY, Square.X, Square.O],
            [Square.EMPTY, Square.X, Square.EMPTY]
        ],
        [
            [Square.O, Square.EMPTY, Square.X],
            [Square.O, Square.EMPTY, Square.X],
            [Square.EMPTY, Square.EMPTY, Square.X]
        ],
        [
            [Square.O, Square.O, Square.O],
            [Square.X, Square.EMPTY, Square.EMPTY],
            [Square.EMPTY, Square.X, Square.X]
        ],
        [
            [Square.X, Square.EMPTY, Square.EMPTY],
            [Square.O, Square.O, Square.O],
            [Square.EMPTY, Square.X, Square.X]
        ],
        [
            [Square.X, Square.EMPTY, Square.EMPTY],
            [Square.EMPTY, Square.X, Square.X],
            [Square.O, Square.O, Square.O]
        ],
        [
            [Square.X, Square.EMPTY, Square.EMPTY],
            [Square.EMPTY, Square.X, Square.EMPTY],
            [Square.O, Square.O, Square.X]
        ],
        [
            [Square.X, Square.EMPTY, Square.O],
            [Square.EMPTY, Square.O, Square.EMPTY],
            [Square.O, Square.X, Square.X]
        ],
    ]

    for (const expectedBoard of expectedBoards) {
        const game = new TicTacToe();
        const turns = extractTurnsFromBoard(expectedBoard)

        let currentPlayer;
        while(turns.get(Square.X).length > 0 || turns.get(Square.O).length > 0) {
            currentPlayer = currentPlayer == Square.X ? Square.O : Square.X
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
    turns.set(Square.X, [])
    turns.set(Square.O, [])

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] == Square.X) {
                turns.get(Square.X).push([x,y])
            } else if (board[x][y] == Square.O) {
                turns.get(Square.O).push([x,y])
            }
        }
    }
    return turns 
}