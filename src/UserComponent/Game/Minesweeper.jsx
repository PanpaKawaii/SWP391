import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import './Minesweeper.css';

export default function Minesweeper() {

    const [GameMode, setGameMode] = useState({
        rowCount: 24,
        colCount: 20,
        bombNumber: 99,
        flagNumber: 99,
    });
    const [Flag, setFlag] = useState(GameMode.flagNumber);
    const [Time, setTime] = useState(-1);
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
        setTime(-1);
        setHasWon(0);
        generateGameBoardBomb();
    }, [GameMode, Refresh]);

    const changeGameMode = (Mode) => {
        const newGameMode = { ...GameMode };
        if (Mode === 'Easy') {
            newGameMode.rowCount = 12;
            newGameMode.colCount = 8;
            newGameMode.bombNumber = 14;
            newGameMode.flagNumber = 14;
        } else if (Mode === 'Normal') {
            newGameMode.rowCount = 18;
            newGameMode.colCount = 14;
            newGameMode.bombNumber = 40;
            newGameMode.flagNumber = 40;
        } else if (Mode === 'Hard') {
            newGameMode.rowCount = 24;
            newGameMode.colCount = 20;
            newGameMode.bombNumber = 99;
            newGameMode.flagNumber = 99;
        } else {
            newGameMode.rowCount = 10;
            newGameMode.colCount = 10;
            newGameMode.bombNumber = 12;
            newGameMode.flagNumber = 12;
        }
        console.log('Set Game Mode', newGameMode.bombNumber);
        const newGameBoard = Array(newGameMode.rowCount).fill(0).map(() =>
            Array(newGameMode.colCount).fill(0).map(() => ({ value: 0, isRevealed: false, flag: false }))
        );
        setGameBoard(newGameBoard);
        setGameMode(newGameMode);
    }

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

        if (Time === -1) setTime(0);

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
        if (GameBoard[row][col].flag === false && Flag === 0) return;
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

    useEffect(() => {
        let interval;
        if (HasWon === 0 && Time !== -1) {
            interval = setInterval(() => {
                setTime(Time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [Time, HasWon]);



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
            </div>

            <div className='game-content'>
                <Table
                    className='no-wrap align-middle table boardgame'
                    style={{
                        '--table-width': GameMode.colCount,
                        '--table-height': GameMode.rowCount,
                        border:
                            HasWon === 1 ?
                                '4px solid #28a745'
                                :
                                (HasWon === 2 ?
                                    '4px solid #dc3545'
                                    :
                                    '4px solid #d97720'
                                ),
                    }}>
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
                                        <p>
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
                                        </p>
                                        {/* <p>
                                            {checkSurroundingCells(index_row, index_col)}
                                        </p> */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='game-detail'>
                    <div className={Time !== -1 && 'button-detail'}>
                        <div className='support-detail'>
                            <h3><i className='fa-solid fa-flag' style={{ color: 'red' }}></i> <b>{Flag}</b></h3>
                            <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
                        </div>
                        <DropdownButton id='dropdown-basic-button' title='GAME MODE'>
                            <Dropdown.Item style={{ color: '#28a745', backgroundColor: '#d3f9d8', fontWeight: 'bold' }}
                                onClick={() => { changeGameMode('Easy') }}>Easy</Dropdown.Item>
                            <Dropdown.Item style={{ color: '#ffc107', backgroundColor: '#fff3cd', fontWeight: 'bold' }}
                                onClick={() => { changeGameMode('Normal') }}>Normal</Dropdown.Item>
                            <Dropdown.Item style={{ color: '#dc3545', backgroundColor: '#fad7d9', fontWeight: 'bold' }}
                                onClick={() => { changeGameMode('Hard') }}>Hard</Dropdown.Item>
                            <Dropdown.Item style={{ color: '#666666', backgroundColor: '#fafafa', fontWeight: 'bold' }}
                                onClick={() => { changeGameMode('Test') }}>Test</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className='result-detail'>
                        {Time !== -1 && <h3>Time: <b>{Time}</b></h3>}
                        {HasWon === 1 && <h2 style={{ color: '#28a745' }}><b>YOU WON!</b></h2>}
                        {HasWon === 2 && <h2 style={{ color: '#dc3545' }}><b>YOU LOST!</b></h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}
