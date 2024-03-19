export default function GameLog({turns}) {
    return (
        <ol id="log">
            {turns.map((turn, index) => <li key={index}>{turn}</li>)}
        </ol>
    )
}