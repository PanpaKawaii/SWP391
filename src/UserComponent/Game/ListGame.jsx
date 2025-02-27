import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ListGame.css';

import CaroSRC from '../../assets/imageGAMEs/Caro.png';
import GenerateMaze from '../../assets/imageGAMEs/GenerateMaze.png';
import MinesweeperSRC from '../../assets/imageGAMEs/Minesweeper.png';
import RandomCard from '../../assets/imageGAMEs/RandomCard.png';
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
        { name: 'Chess', src: '', link: '/game/chess' },
        { name: 'Tetris', src: Tetris, link: '/game/tetris' },
        { name: 'Solve The Maze', src: SolveTheMazeSRC, link: '/game/solvethemaze' },
        { name: 'Generate Maze', src: GenerateMaze, link: '/game/generatemaze' },
        { name: 'Type Pi', src: TypePi, link: '/game/typepi' },
        { name: 'Random Card (VW > 1227px)', src: RandomCard, link: '/game/randomcard' },
        { name: 'To Do List', src: ToDoListSRC, link: '/game/todolist' },
        { name: 'Test Object', src: '', link: '/game/object' },
    ];

    return (
        <div className='listgame-container'>
            <div className='header'>
                <h1><b>List Game</b></h1>
            </div>
            <div className='content'>
                <Row className='image-row'>
                    {ListGame.map((game, index) => (
                        <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3} xxl={2} className='image-col'>
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
