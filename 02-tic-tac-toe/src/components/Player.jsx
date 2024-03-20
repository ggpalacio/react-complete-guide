import { useState} from 'react';
import Input from './Input';

export default function Player({isActive, name, symbol, onEditClick}) {
    const [playerName,setPlayerName] = useState(name)
    const [isEditing,setIsEditing] = useState(false)


    function handleOnChange(event) {
        setPlayerName(event.target.value.toUpperCase())
    }

    function handleClick() {
        if (isEditing) {
            onEditClick(symbol, playerName)
        }
        setIsEditing(prevIsEditing => !prevIsEditing)
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                <Input value={playerName} readonly={!isEditing} className="player-name" onChange={handleOnChange} />
                <span className="player-symbol">{symbol.value}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}