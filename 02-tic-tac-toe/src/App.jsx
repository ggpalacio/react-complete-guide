import Player from "./components/Player"
import {useState} from "react"
import TicTacToe, { Symbol } from "./game"

function App() {
  const [game,setGame] = useState(new TicTacToe())

  function onSavePlayerName(symbol, name) {
    game.setPlayerName(symbol, name)
    setGame(game)
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={game.getPlayerName(Symbol.X)}
            symbol={Symbol.X}
            handleEditClick={onSavePlayerName}
          />
          <Player
            name={game.getPlayerName(Symbol.O)}
            symbol={Symbol.O}
            handleEditClick={onSavePlayerName}
          />
        </ol>
      </div>
    </main>
  )
}

export default App
