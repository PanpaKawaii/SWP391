import React from 'react'
import { Link } from 'react-router-dom';

export default function ListGame() {
    return (
        <div>
            <h1>List Game</h1>

            <Link to='/game/minesweeper'><i className='fa-solid fa-bomb'></i>Minesweeper</Link>
        </div>
    )
}
