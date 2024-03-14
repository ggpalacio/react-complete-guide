import {useState} from 'react';

export default function Player({isActive, name, symbol, handleEditClick}) {
    const [playerName,setPlayerName] = useState(name)
    const [isEditing,setIsEditing] = useState(false)
    
    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    function handleClick() {
        if (isEditing) {
            handleEditClick(symbol, playerName)
        }
        setIsEditing(prevIsEditing => !prevIsEditing)
    }

    var playerNameComponent = <span className="player-name">{name}</span>
    if (isEditing) {
        playerNameComponent = <input type="text" required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerNameComponent}
                <span className="player-symbol">{symbol.value}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}