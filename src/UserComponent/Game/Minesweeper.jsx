import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import './Minesweeper.css';

export default function Minesweeper() {

    const [GameMode, setGameMode] = useState(99);
    const [Refresh, setRefresh] = useState(0);

    const [GameBoard, setGameBoard] = useState(Array(20).fill(0).map(() =>
        Array(24).fill(0).map(() => ({ value: 0, isRevealed: false }))
    ));

    useEffect(() => {
        const generateGameBoardBomb = () => {
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

        generateGameBoardBomb();
    }, [Refresh]);

    const checkSurroundingCells = (row, col) => {
        let count = 0;
        if (GameBoard[row][col].value === 9) return 9;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < 20 && newCol >= 0 && newCol < 24) {
                    if (GameBoard[newRow][newCol].value === 9) {
                        count++;
                    }
                }
            }
        }
        GameBoard[row][col].value = count;
        return count;
    };

    const revealCell = (row, col) => {
        if (GameBoard[row][col].value === 9) revealCellBomb();
        if (GameBoard[row][col].isRevealed) return;
        const newGameBoard = [...GameBoard];
        newGameBoard[row][col].isRevealed = true;
        setGameBoard(newGameBoard);

        if (GameBoard[row][col].value === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < 20 && newCol >= 0 && newCol < 24) {
                        revealCell(newRow, newCol);
                    }
                }
            }
        }
    };

    const revealCellBomb = () => {
        const newGameBoard = [...GameBoard];
        newGameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell.value === 9) {
                    newGameBoard[rowIndex][colIndex].isRevealed = true;
                }
            });
        });
        setGameBoard(newGameBoard);
    };

    const countMines = () => {
        return GameBoard.reduce((acc, row) => {
            return acc + row.reduce((innerAcc, cell) => {
                return cell.value === 9 ? innerAcc + 1 : innerAcc;
            }, 0);
        }, 0);
    };

    return (
        <div className='minesweeper-container'>
            <div className='header'>
                <h1><b>Minesweeper {countMines()}</b></h1>
                <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
            </div>

            <Table className='no-wrap align-middle table' style={{ '--table-width': 24, '--table-height': 20 }}>
                <tbody>
                    {[...Array(20)].map((_, index_row) => (
                        <tr key={index_row}>
                            {[...Array(24)].map((_, index_col) => (
                                <td key={index_col}
                                    style={{
                                        cursor: checkSurroundingCells(index_row, index_col) !== 0 && 'pointer',
                                        backgroundColor:
                                            GameBoard[index_row][index_col].isRevealed ?
                                                (GameBoard[index_row][index_col].value == 9 ? '#dc3545' : '#ffd9a9')
                                                :
                                                ((index_row + index_col) % 2 === 0 ? '#ffcc80' : '#ffab40')
                                    }}
                                    onClick={() => { revealCell(index_row, index_col) }}
                                >
                                    <span>
                                        {
                                            checkSurroundingCells(index_row, index_col) !== 0 &&
                                            GameBoard[index_row][index_col].isRevealed &&
                                            checkSurroundingCells(index_row, index_col)
                                        }
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
