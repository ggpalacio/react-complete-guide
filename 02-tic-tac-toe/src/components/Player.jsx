import {useState} from 'react';
import IO from './IO';

export default function Player({isActive, name, symbol, onEditClick}) {
    const [playerName,setPlayerName] = useState(name)
    const [isEditing,setIsEditing] = useState(false)

    function handleClick() {
        if (isEditing) {
            onEditClick(symbol, playerName)
        }
        setIsEditing(prevIsEditing => !prevIsEditing)
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                <IO value={playerName} setValue={setPlayerName} isEditing={isEditing} className="player-name" />
                <span className="player-symbol">{symbol.value}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}