import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './ListGame.css';

import CaroSRC from '../../assets/imageGAMEs/Caro.png';
import GenerateMaze from '../../assets/imageGAMEs/GenerateMaze.png';
import MinesweeperSRC from '../../assets/imageGAMEs/Minesweeper.png';
import SolveTheMazeSRC from '../../assets/imageGAMEs/SolveTheMaze.png';
import Tetris from '../../assets/imageGAMEs/Tetris.png';
import ToDoListSRC from '../../assets/imageGAMEs/ToDoList.png';
import TypePi from '../../assets/imageGAMEs/TypePi.png';
import WhatIsThePasswordSRC from '../../assets/imageGAMEs/WhatIsThePassword.png';

export default function ListGame() {

    const ListGame = [
        { name: 'Minesweeper', src: MinesweeperSRC, link: '/game/minesweeper' },
        { name: 'What Is The Password?', src: WhatIsThePasswordSRC, link: '/game/whatisthepassword' },
        { name: 'Caro', src: CaroSRC, link: '/game/caro' },
        { name: 'Tetris', src: Tetris, link: '/game/tetris' },
        { name: 'Solve The Maze', src: SolveTheMazeSRC, link: '/game/solvethemaze' },
        { name: 'Generate Maze', src: GenerateMaze, link: '/game/generatemaze' },
        { name: 'Type Pi', src: TypePi, link: '/game/typepi' },
        { name: 'Random Card', src: TypePi, link: '/game/randomcard' },
        { name: 'To Do List', src: ToDoListSRC, link: '/game/todolist' },
        { name: 'Test App', src: '', link: '/game/testapp' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
        { name: 'Name Game', src: '', link: '/game/aaaaaaaaaaaaaaaaaaaa' },
    ];

    return (
        <div className='listgame-container'>
            <div className='listgame-header'>
                <h1><b>List Game</b></h1>
            </div>
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
            <hr/>
            <Outlet />
        </div>
    )
}
