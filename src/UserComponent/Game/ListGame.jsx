import React from 'react'
import { Link } from 'react-router-dom';
import './ListGame.css';

export default function ListGame() {
    return (
        <div className='listgame-container'>
            <h1>List Game</h1>

            <Link to='/game/minesweeper'><i className='fa-solid fa-bomb'></i>Minesweeper</Link>
            <Link to='/game/whatisthepassword'><i className='fa-solid fa-code'></i>WhatIsThePassword</Link>
        </div>
    )
}
