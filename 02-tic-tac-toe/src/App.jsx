import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { Symbol, useGame } from "./game"

function App() {
  const game = useGame()

  function handleEditClick(symbol, name) {
    game.setPlayerName(symbol, name)
  }

  function handleSquareClick(rowIndex, colIndex) {
    game.markSquare(rowIndex, colIndex)
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={game.getPlayerName(Symbol.X)}
            symbol={Symbol.X}
            onEditClick={handleEditClick}
          />
          <Player
            name={game.getPlayerName(Symbol.O)}
            symbol={Symbol.O}
            onEditClick={handleEditClick}
          />
        </ol>
        <GameBoard board={game.getBoard()} onSquareClick={handleSquareClick} />
      </div>
    </main>
  )
}

export default App
