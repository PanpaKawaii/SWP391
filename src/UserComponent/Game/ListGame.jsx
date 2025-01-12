import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import './ListGame.css';

import MinesweeperSRC from '../../assets/imageGAMEs/Minesweeper.png';
import WhatIsThePasswordSRC from '../../assets/imageGAMEs/Minesweeper.png';
import SolveTheMazeSRC from '../../assets/imageGAMEs/SolveTheMaze.png';
import ToDoListSRC from '../../assets/imageGAMEs/Minesweeper.png';

export default function ListGame() {

    const ListGame = [
        { name: 'Minesweeper', src: MinesweeperSRC, link: '/game/minesweeper' },
        { name: 'What Is The Password?', src: '', link: '/game/whatisthepassword' },
        { name: 'Solve The Maze', src: SolveTheMazeSRC, link: '/game/solvethemaze' },
        { name: 'To Do List', src: '', link: '/game/todolist' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
    ];

    return (
        <div className='listgame-container'>
            <h1><b>List Game</b></h1>

            {/* <div className='listgame'>
                <Link to='/game/minesweeper'>
                    <img src={MinesweeperSRC} alt='minesweeper'></img>
                    <h3><b>Minesweeper</b></h3>
                </Link>
                <Link to='/game/whatisthepassword'>
                    <img src='' alt='whatisthepassword'></img>
                    <h3><b>What Is The Password?</b></h3>
                </Link>
                <Link to='/game/solvethemaze'>
                    <img src='' alt='solvethemaze'></img>
                    <h3><b>Solve The Maze</b></h3>
                </Link>
            </div> */}

            <div className='listgame'>
                <Row className='image-row'>
                    {ListGame.map((game, index) => (
                        <Col key={index} sm={6} md={4} lg={3} xl={3} xxl={2} className='image-col'>
                            <Link to={`${game.link}`}>
                                <Card className='image-card'>
                                    <Card.Body className='card-body'>
                                        <img src={game.src} alt={game.name} />
                                        <h4><b>{game.name}</b></h4>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
