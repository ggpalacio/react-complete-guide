import { test, expect } from '@jest/globals'
import { Symbol, useGame } from './game';
import { renderHook, waitFor } from "@testing-library/react";

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

    const { result } = renderHook(() => useGame());
    expect(result.current.board).toEqual(expectedBoard);
    expect(result.current.players).toEqual(expectedPlayers);
    expect(result.current.currentPlayer).toBe(Symbol.X);
    expect(result.current.turns).toHaveLength(0);
    expect(result.current.winner).toBeNull();
});

test('should set player name successfully', async () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.getPlayerName(Symbol.X)).toBe("Player 1");
    expect(result.current.getPlayerName(Symbol.O)).toBe("Player 2");

    await waitFor(() => result.current.setPlayerName(Symbol.X, 'Player X'));
    expect(result.current.getPlayerName(Symbol.X)).toBe("Player X");
    expect(result.current.getPlayerName(Symbol.O)).toBe("Player 2");

    await waitFor(() => result.current.setPlayerName(Symbol.O, 'Player O'));
    expect(result.current.getPlayerName(Symbol.X)).toBe("Player X");
    expect(result.current.getPlayerName(Symbol.O)).toBe("Player O");
})

test('should mark a square successfully', async () => {
    const { result } = renderHook(() => useGame());
    let expectedBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    expect(result.current.board).toEqual(expectedBoard);
    expect(result.current.currentPlayer).toBe(Symbol.X);
    expect(result.current.turns).toHaveLength(0);

    await waitFor(() => result.current.markSquare(0, 0));
    expectedBoard = [
        [Symbol.X, null, null],
        [null, null, null],
        [null, null, null]
    ]
    expect(result.current.board).toEqual(expectedBoard);
    expect(result.current.currentPlayer).toBe(Symbol.O);
    expect(result.current.turns).toHaveLength(1);
    expect(result.current.turns[0]).toBe('Player 1 marks X in square at position (0,0)');
    
    await waitFor(() => result.current.markSquare(1, 1));
    expectedBoard = [
        [Symbol.X, null, null],
        [null, Symbol.O, null],
        [null, null, null]
    ]
    expect(result.current.board).toEqual(expectedBoard);
    expect(result.current.currentPlayer).toBe(Symbol.X);
    expect(result.current.turns).toHaveLength(2);
    expect(result.current.turns[1]).toBe('Player 2 marks O in square at position (1,1)');
    
    await waitFor(() => result.current.markSquare(2, 2))
    expectedBoard = [
        [Symbol.X, null, null],
        [null, Symbol.O, null],
        [null, null, Symbol.X]
    ]
    expect(result.current.board).toEqual(expectedBoard);
    expect(result.current.currentPlayer).toBe(Symbol.O);
    expect(result.current.turns).toHaveLength(3);
    expect(result.current.turns[2]).toBe('Player 1 marks X in square at position (2,2)');
});

test('should not mark a square with invalid postion indexes', () => {
    const { result } = renderHook(() => useGame());
    expect(() => result.current.markSquare(-1, 0)).toThrow('position indexes must be greater or equal than 0');
    expect(() => result.current.markSquare(0, -1)).toThrow('position indexes must be greater or equal than 0');
    expect(() => result.current.markSquare(3, 0)).toThrow('position indexes must be smaller than 3');
    expect(() => result.current.markSquare(0, 3)).toThrow('position indexes must be smaller than 3');
});

test('should not mark a square already marked', async () => {
    const { result } = renderHook(() => useGame());
    await waitFor(() => result.current.markSquare(0, 0));
    expect(() => result.current.markSquare(0, 0)).toThrow('square at position (0,0) is not empty');
});

test('should throw game over error', async () => {
    const { result } = renderHook(() => useGame());
    await waitFor(() => {
        result.current.markSquare(0, 0)
        result.current.markSquare(1, 0)
        result.current.markSquare(0, 1)
        result.current.markSquare(1, 1)
        result.current.markSquare(0, 2)
    });
    expect(() => result.current.markSquare(1, 2)).toThrow('the game is over');
});

test('should have a winner', async () => {
    const games = [
        {
            "turns": [[0,0],[0,1],[1,0],[1,1],[2,0]],
            "expectedBoard": [
                [Symbol.X, Symbol.O, null],
                [Symbol.X, Symbol.O, null],
                [Symbol.X, null, null]
            ],
        },
        {
            "turns": [[0,1],[0,2],[1,1],[1,2],[2,1]],
            "expectedBoard": [
                [null, Symbol.X, Symbol.O],
                [null, Symbol.X, Symbol.O],
                [null, Symbol.X, null]
            ],
        },
        {
            "turns": [[2,2],[0,0],[1,2],[1,0],[0,2]],
            "expectedBoard": [   
                [Symbol.O, null, Symbol.X],
                [Symbol.O, null, Symbol.X],
                [null, null, Symbol.X]
            ],
        },
        {
            "turns": [[1,0],[0,2],[2,2],[0,1],[2,1],[0,0]],
            "expectedBoard": [
                [Symbol.O, Symbol.O, Symbol.O],
                [Symbol.X, null, null],
                [null, Symbol.X, Symbol.X]
            ],
        },
        {
            "turns": [[0,0],[1,0],[2,2],[1,1],[2,1],[1,2]],
            "expectedBoard": [
                [Symbol.X, null, null],
                [Symbol.O, Symbol.O, Symbol.O],
                [null, Symbol.X, Symbol.X]
            ],
        },
        {
            "turns": [[0,0],[2,2],[1,2],[2,0],[1,1],[2,1]],
            "expectedBoard": [
                [Symbol.X, null, null],
                [null, Symbol.X, Symbol.X],
                [Symbol.O, Symbol.O, Symbol.O]
            ],
        },
        {
            "turns": [[0,0],[2,0],[1,1],[2,1],[2,2]],
            "expectedBoard": [
                [Symbol.X, null, null],
                [null, Symbol.X, null],
                [Symbol.O, Symbol.O, Symbol.X]
            ],
        },
        {
            "turns": [[2,2],[0,2],[2,1],[2,0],[0,0],[1,1]],
            "expectedBoard": [
                [Symbol.X, null, Symbol.O],
                [null, Symbol.O, null],
                [Symbol.O, Symbol.X, Symbol.X]
            ],
        }
    ]

    for (const game of games) {
        const { result } = renderHook(() => useGame());

        let currentPlayer;
        for (const turn of game.turns) {
            currentPlayer = currentPlayer == Symbol.X ? Symbol.O : Symbol.X
            expect(result.current.currentPlayer).toBe(currentPlayer);
            expect(result.current.winner).toBeNull;
            expect(result.current.gameOver).toBe(false);await waitFor
            await waitFor(() => result.current.markSquare(...turn));
        }
        expect(result.current.currentPlayer).toBeNull();
        expect(result.current.winner).toBe(currentPlayer);
        expect(result.current.gameOver).toBe(true);
        expect(result.current.board).toEqual(game.expectedBoard);
    }
});