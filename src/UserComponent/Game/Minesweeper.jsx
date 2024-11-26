import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import './Minesweeper.css';

export default function Minesweeper() {

    const [GameMode, setGameMode] = useState(99);

    const [GameBoard, setGameBoard] = useState(Array(20).fill(0).map(() =>
        Array(24).fill(0).map(() => ({ value: 0, isRevealed: false }))
    ));

    useEffect(() => {
        const generateGameBoard = () => {
            const newGameBoard = Array(20).fill(0).map(() =>
                Array(24).fill(0).map(() => ({ value: 0, isRevealed: false }))
            );

            let count = 0;
            while (count < GameMode) {
                const row = Math.floor(Math.random() * 20);
                const col = Math.floor(Math.random() * 24);
                if (newGameBoard[row][col].value !== 9) {
                    newGameBoard[row][col].value = 9;
                    count++;
                }
            }

            setGameBoard(newGameBoard);
        };

        generateGameBoard();
    }, []);

    const countMines = () => {
        return GameBoard.reduce((acc, row) => {
            return acc + row.reduce((innerAcc, cell) => {
                return cell.value === 9 ? innerAcc + 1 : innerAcc;
            }, 0);
        }, 0);
    };

    return (
        <div className='minesweeper-container'>
            <h1><b>Minesweeper {countMines()}</b></h1>
            {/* <div className='box'>
                {[...Array(24)].map((_, index_row) => (
                    <Row key={index_row} className='cell-row'>
                        {[...Array(24)].map((_, index_col) => (
                            <Col key={index_col} className='cell-col'>
                                {index_row + 1}.
                                {index_col + 1}
                            </Col>
                        ))}
                    </Row>
                ))}
            </div> */}

            <Table className='no-wrap align-middle table' style={{ '--table-width': 24, '--table-height': 20 }}>
                <tbody className='list-body'>
                    {[...Array(20)].map((_, index_row) => (
                        <tr key={index_row} className='tr-row'>
                            {[...Array(24)].map((_, index_col) => (
                                <td key={index_col}
                                    className='td-col'
                                    onClick={() => {
                                        const newGameBoard = [...GameBoard];
                                        newGameBoard[index_row][index_col].isRevealed = true;
                                        setGameBoard(newGameBoard);
                                    }}
                                    // style={{ backgroundColor: GameBoard[index_row][index_col].isRevealed ? '#ffd9a9' : ((index_row + index_col) % 2 === 0 ? '#ffcc80' : '#ffab40') }}
                                    style={{ backgroundColor: GameBoard[index_row][index_col].value == 9 ? '#dc3545' : ((index_row + index_col) % 2 === 0 ? '#ffcc80' : '#ffab40') }}
                                >
                                    {/* <p>
                                        {index_row + 1}.
                                        {index_col + 1}
                                    </p> */}
                                    <span style={{
                                        color: GameBoard[index_row][index_col].isRevealed ? '#28a745' : '#ffc107',
                                    }}>
                                        {GameBoard[index_row][index_col].value}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
