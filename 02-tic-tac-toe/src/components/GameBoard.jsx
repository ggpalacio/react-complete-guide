export default function GameBoard({ board, onSquareClick }) {
    
    function handleClick(rowIndex, colIndex) {
        onSquareClick(rowIndex, colIndex)
    }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((_, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleClick(rowIndex, colIndex)}
                                        disabled={board[rowIndex][colIndex]}>
                                    {board[rowIndex][colIndex] && board[rowIndex][colIndex].value}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}