import GameBoard from "./components/GameBoard"
import GameLog from "./components/GameLog"
import GameOver from "./components/GameOver"
import Player from "./components/Player"
import { Symbol, useGame } from "./hooks/game"

function App() {
  const game = useGame()

  function handleEditClick(symbol, name) {
    game.setPlayerName(symbol, name)
  }

  function handleSquareClick(rowIndex, colIndex) {
    game.markSquare(rowIndex, colIndex)
  }

  function handleRestart() {
    game.rematch()
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={game.getPlayerName(Symbol.X)}
            symbol={Symbol.X}
            isActive={game.currentPlayer == Symbol.X}
            onEditClick={handleEditClick}
          />
          <Player
            name={game.getPlayerName(Symbol.O)}
            symbol={Symbol.O}
            isActive={game.currentPlayer == Symbol.O}
            onEditClick={handleEditClick}
          />
        </ol>
        {game.gameOver && <GameOver winner={game.getWinnerName()} onRestart={handleRestart} />}
        <GameBoard board={game.board} onSquareClick={handleSquareClick} />
      </div>
      <GameLog turns={game.turns} />
    </main>
  )
}

export default App
