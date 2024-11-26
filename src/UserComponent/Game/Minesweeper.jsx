import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import './Minesweeper.css';

export default function Minesweeper() {

    const [GameMode, setGameMode] = useState({
        rowCount: 12,
        colCount: 18,
        bombNumber: 40,
        flagNumber: 4,
    });
    const [Flag, setFlag] = useState(GameMode.flagNumber);
    const [HasWon, setHasWon] = useState(0);
    const [Refresh, setRefresh] = useState(0);

    const [GameBoard, setGameBoard] = useState(Array(GameMode.rowCount).fill(0).map(() =>
        Array(GameMode.colCount).fill(0).map(() => ({ value: 0, isRevealed: false, flag: false }))
    ));

    useEffect(() => {
        const generateGameBoardBomb = () => {
            console.log('generateGameBoardBomb');
            const newGameBoard = Array(GameMode.rowCount).fill(0).map(() =>
                Array(GameMode.colCount).fill(0).map(() => ({ value: 0, isRevealed: false, flag: false }))
            );

            let count = 0;
            while (count < GameMode.bombNumber) {
                const row = Math.floor(Math.random() * GameMode.rowCount);
                const col = Math.floor(Math.random() * GameMode.colCount);
                if (newGameBoard[row][col].value !== 9) {
                    newGameBoard[row][col].value = 9;
                    count++;
                }
            }

            setGameBoard(newGameBoard);
            console.log('generateGameBoardBomb Success');
        };

        setFlag(GameMode.flagNumber);
        setHasWon(0);
        generateGameBoardBomb();
    }, [GameMode, Refresh]);

    const checkSurroundingCells = (row, col) => {
        let count = 0;
        if (GameBoard[row][col].value === 9) return 9;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < GameMode.rowCount && newCol >= 0 && newCol < GameMode.colCount) {
                    if (GameBoard[newRow][newCol].value === 9) {
                        count++;
                    }
                }
            }
        }
        GameBoard[row][col].value = count;
        return count;
    };

    const checkSurroundingFlags = (row, col) => {
        console.log('checkSurroundingFlags');
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < GameMode.rowCount && newCol >= 0 && newCol < GameMode.colCount) {
                    if (GameBoard[newRow][newCol].flag === true) {
                        count++;
                    }
                }
            }
        }
        console.log('checkSurroundingFlags Success');
        return count;
    };

    const revealCell = (row, col) => {
        console.log('revealCell');
        if (GameBoard[row][col].isRevealed) return;//Đã mở rồi thì không mở nữa
        if (GameBoard[row][col].flag) return;//Đã cắm cờ rồi thì không mở được

        if (GameBoard[row][col].value === 9) revealAllCellBomb();
        const newGameBoard = [...GameBoard];
        newGameBoard[row][col].isRevealed = true;
        setGameBoard(newGameBoard);

        if (GameBoard[row][col].value === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < GameMode.rowCount && newCol >= 0 && newCol < GameMode.colCount) {
                        revealCell(newRow, newCol);
                    }
                }
            }
        }
        console.log('revealCell Success');
        checkWin();
    };

    const revealCellAround = (row, col) => {
        console.log('revealCellAround');
        console.log('SurroundingFlags', checkSurroundingFlags(row, col));
        if (!GameBoard[row][col].isRevealed) return;//Chưa mở thì chưa được doubleClick
        if (GameBoard[row][col].flag) return;//Đã cắm cờ rồi thì không mở xung quang được

        if (GameBoard[row][col].value === 9) revealAllCellBomb();

        if (checkSurroundingFlags(row, col) == checkSurroundingCells(row, col)) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < GameMode.rowCount && newCol >= 0 && newCol < GameMode.colCount) {
                        revealCell(newRow, newCol);
                    }
                }
            }
        }
        console.log('revealCellAround Success');
    };

    const setTheFlag = (row, col) => {
        console.log('setTheFlag');
        if (GameBoard[row][col].isRevealed) return;
        if (Flag === 0) return;
        const newGameBoard = [...GameBoard];
        newGameBoard[row][col].flag = !newGameBoard[row][col].flag;
        newGameBoard[row][col].flag ? setFlag(Flag - 1) : setFlag(Flag + 1);
        setGameBoard(newGameBoard);
        console.log('setTheFlag Success');
    }

    const revealAllCellBomb = () => {
        console.log('revealAllCellBomb');
        const newGameBoard = [...GameBoard];
        newGameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell.value === 9) {
                    newGameBoard[rowIndex][colIndex].isRevealed = true;
                }
            });
        });
        setGameBoard(newGameBoard);
        setHasWon(2);
        console.log('revealAllCellBomb Success');
    };

    const checkWin = () => {
        let hasWon = true;
        GameBoard.forEach((row) => {
            row.forEach((cell) => {
                if ((cell.value !== 9 && !cell.isRevealed) || (cell.value === 9 && cell.isRevealed)) {
                    hasWon = false;
                    return;
                }
            });
        });
        if (hasWon) {
            console.log('You have won the game!');
            setHasWon(1);
        }
    }



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
                <h1><b>Minesweeper</b></h1>
                {HasWon == 1 && <h2 style={{ color: '#28a745' }}><b>YOU WON!</b></h2>}
                {HasWon == 2 && <h2 style={{ color: '#dc3435' }}><b>YOU LOST!</b></h2>}
                <h3><i className='fa-solid fa-flag' style={{ color: 'red' }}></i> <b>{Flag}</b></h3>
                <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
            </div>

            <Table className='no-wrap align-middle table' style={{ '--table-width': GameMode.colCount, '--table-height': GameMode.rowCount }}>
                <tbody>
                    {[...Array(GameMode.rowCount)].map((_, index_row) => (
                        <tr key={index_row}>
                            {[...Array(GameMode.colCount)].map((_, index_col) => (
                                <td key={index_col}
                                    style={{
                                        cursor:
                                            (
                                                checkSurroundingCells(index_row, index_col) !== 0 ?
                                                    (GameBoard[index_row][index_col].isRevealed ?
                                                        'pointer'
                                                        :
                                                        'pointer'
                                                    )
                                                    :
                                                    (GameBoard[index_row][index_col].isRevealed ?
                                                        'default'
                                                        :
                                                        'pointer'
                                                    )
                                            )
                                        ,
                                        backgroundColor:
                                            GameBoard[index_row][index_col].isRevealed ?
                                                (GameBoard[index_row][index_col].value !== 9 ?
                                                    '#ffd9a9'
                                                    :
                                                    GameBoard[index_row][index_col].flag ?
                                                        '#d97720'
                                                        :
                                                        '#dc3545')
                                                :
                                                ((index_row + index_col) % 2 === 0 ? '#ffcc80' : '#ffab40')
                                    }}
                                    onClick={() => { revealCell(index_row, index_col) }}
                                    onDoubleClick={() => { revealCellAround(index_row, index_col) }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setTheFlag(index_row, index_col)
                                    }}
                                >
                                    <span>
                                        {
                                            (GameBoard[index_row][index_col].isRevealed ?//Được mở mới hiện số, không thì kiểm tra có cờ không
                                                (checkSurroundingCells(index_row, index_col) !== 9 ?//In ra số nếu không phải bom
                                                    (checkSurroundingCells(index_row, index_col) !== 0 &&//Khác 0 mới hiện số
                                                        checkSurroundingCells(index_row, index_col))
                                                    :
                                                    <i className='fa-solid fa-bomb'></i>//In ra quả bom
                                                )
                                                :
                                                (GameBoard[index_row][index_col].flag &&//Nếu được cắm cờ thì hiện cờ
                                                    <i className='fa-solid fa-flag' style={{ color: 'red' }}></i>)
                                            )
                                        }
                                    </span>
                                    {/* <span>
                                        {checkSurroundingCells(index_row, index_col)}
                                    </span> */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
