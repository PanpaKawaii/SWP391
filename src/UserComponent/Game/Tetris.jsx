import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './Tetris.css';

export default function Tetris() {


    const [GameBoard, setGameBoard] = useState(Array(20).fill(1).map(() => Array(10).fill(0)));
    const [FallingObject, setFallingObjectd] = useState(Array(20).fill(1).map(() => Array(10).fill(0)));


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                ClickRight();
            } else if (e.key === 'ArrowLeft') {
                ClickLeft();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const ClickRight = () => {
        setGameBoard([]);
    }

    const ClickLeft = () => {
        setGameBoard([]);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedGameBoard = GameBoard.map((row, index) => {
                return row.map((cell, index) => index === 0 ? 1 : cell);
            });
            setGameBoard(updatedGameBoard);
            console.log('Interval executed');
        }, 300);

        return () => clearInterval(interval);
    }, []);

    const handleEditingMaze = (e) => {
        e.preventDefault();
    }

    return (
        <div className='tetris-container'>
            <div className='header'>
                <h1><b>Tetris</b></h1>
            </div>

            <div className='game-content'>
                <Table bordered
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody>
                        {GameBoard.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            backgroundColor: cell === 0 ?
                                                '#064415'
                                                :
                                                (cell === 3 ?
                                                    '#ffc107'
                                                    :
                                                    (cell === 2 ?
                                                        '#dc3545'
                                                        :
                                                        '#007bff'
                                                    )
                                                ),
                                        }}
                                    >
                                        {/* <p>{Maze[index_row][index_col]}</p> */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='game-detail'>
                </div>
            </div>
        </div>
    )
}
