import React from 'react'
import { Link } from 'react-router-dom';
import './ListGame.css';

import MinesweeperSRC from '../../assets/imageGAMEs/Minesweeper.png';
import WhatIsThePasswordSRC from '../../assets/imageGAMEs/Minesweeper.png';

export default function ListGame() {
    return (
        <div className='listgame-container'>
            <h1><b>List Game</b></h1>

            <div className='listgame'>
                <Link to='/game/minesweeper'>
                    <img src={MinesweeperSRC} alt='minesweeper'></img>
                    <h3><b>Minesweeper</b></h3>
                </Link>
                <Link to='/game/whatisthepassword'>
                    <img src='' alt='whatisthepassword'></img>
                    <h3><b>What Is The Password?</b></h3>
                </Link>
            </div>
        </div>
    )
}
