import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './Minesweeper.css';

export default function Minesweeper() {

    const [GameMode, setGameMode] = useState({
        rowCount: 24,
        colCount: 20,
        bombNumber: 99,
        flagNumber: 99,
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('Hard');
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
            const NewGameBoard = Array(GameMode.rowCount).fill(0).map(() =>
                Array(GameMode.colCount).fill(0).map(() => ({ value: 0, isRevealed: false, flag: false }))
            );

            let count = 0;
            while (count < GameMode.bombNumber) {
                const row = Math.floor(Math.random() * GameMode.rowCount);
                const col = Math.floor(Math.random() * GameMode.colCount);
                if (NewGameBoard[row][col].value !== 9) {
                    NewGameBoard[row][col].value = 9;
                    count++;
                }
            }

            setGameBoard(NewGameBoard);
            console.log('generateGameBoardBomb Success');
        };

        setFlag(GameMode.flagNumber);
        setTime(-1);
        setHasWon(0);
        generateGameBoardBomb();
    }, [GameMode, Refresh]);

    const changeGameMode = (Mode) => {
        const NewGameMode = { ...GameMode };
        if (Mode === 'Easy') {
            NewGameMode.rowCount = 12;
            NewGameMode.colCount = 8;
            NewGameMode.bombNumber = 14;
            NewGameMode.flagNumber = 14;
        } else if (Mode === 'Normal') {
            NewGameMode.rowCount = 18;
            NewGameMode.colCount = 14;
            NewGameMode.bombNumber = 40;
            NewGameMode.flagNumber = 40;
        } else if (Mode === 'Hard') {
            NewGameMode.rowCount = 24;
            NewGameMode.colCount = 20;
            NewGameMode.bombNumber = 99;
            NewGameMode.flagNumber = 99;
        } else {
            NewGameMode.rowCount = 10;
            NewGameMode.colCount = 10;
            NewGameMode.bombNumber = 12;
            NewGameMode.flagNumber = 12;
        }
        console.log('Set Game Mode', NewGameMode.bombNumber);
        const NewGameBoard = Array(NewGameMode.rowCount).fill(0).map(() =>
            Array(NewGameMode.colCount).fill(0).map(() => ({ value: 0, isRevealed: false, flag: false }))
        );
        setGameBoard(NewGameBoard);
        setGameMode(NewGameMode);
    }

    const checkSurroundingCells = (row, col) => {
        let count = 0;
        if (GameBoard[row][col].value === 9) return 9;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const NewRow = row + i;
                const NewCol = col + j;
                if (NewRow >= 0 && NewRow < GameMode.rowCount && NewCol >= 0 && NewCol < GameMode.colCount) {
                    if (GameBoard[NewRow][NewCol].value === 9) {
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
                const NewRow = row + i;
                const NewCol = col + j;
                if (NewRow >= 0 && NewRow < GameMode.rowCount && NewCol >= 0 && NewCol < GameMode.colCount) {
                    if (GameBoard[NewRow][NewCol].flag === true) {
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
        const NewGameBoard = [...GameBoard];
        NewGameBoard[row][col].isRevealed = true;
        setGameBoard(NewGameBoard);

        if (GameBoard[row][col].value === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const NewRow = row + i;
                    const NewCol = col + j;
                    if (NewRow >= 0 && NewRow < GameMode.rowCount && NewCol >= 0 && NewCol < GameMode.colCount) {
                        revealCell(NewRow, NewCol);
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
        if (!GameBoard[row][col].isRevealed) return;// Chưa mở thì chưa được doubleClick
        if (GameBoard[row][col].flag) return;// Đã cắm cờ rồi thì không mở xung quang được

        if (GameBoard[row][col].value === 9) revealAllCellBomb();

        if (checkSurroundingFlags(row, col) == checkSurroundingCells(row, col)) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const NewRow = row + i;
                    const NewCol = col + j;
                    if (NewRow >= 0 && NewRow < GameMode.rowCount && NewCol >= 0 && NewCol < GameMode.colCount) {
                        revealCell(NewRow, NewCol);
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
        const NewGameBoard = [...GameBoard];
        NewGameBoard[row][col].flag = !NewGameBoard[row][col].flag;
        NewGameBoard[row][col].flag ? setFlag(Flag - 1) : setFlag(Flag + 1);
        setGameBoard(NewGameBoard);
        console.log('setTheFlag Success');
    }

    const revealAllCellBomb = () => {
        console.log('revealAllCellBomb');
        const NewGameBoard = [...GameBoard];
        NewGameBoard.forEach((row, RowIndex) => {
            row.forEach((cell, ColIndex) => {
                if (cell.value === 9) {
                    NewGameBoard[RowIndex][ColIndex].isRevealed = true;
                }
            });
        });
        setGameBoard(NewGameBoard);
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
        let Interval;
        if (HasWon === 0 && Time !== -1) {
            Interval = setInterval(() => {
                setTime(Time + 1);
            }, 1000);
        }
        return () => clearInterval(Interval);
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

            <div className='content'>
                <Table
                    className='no-wrap align-middle table'
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
                        backgroundColor:
                            HasWon === 1 ?
                                '#28a745'
                                :
                                (HasWon === 2 ?
                                    '#dc3545'
                                    :
                                    '#d97720'
                                ),
                    }}
                >
                    <tbody>
                        {[...Array(GameMode.rowCount)].map((_, index_row) => (
                            <tr key={index_row}>
                                {[...Array(GameMode.colCount)].map((_, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            cursor:
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
                                            ,
                                            backgroundColor:
                                                GameBoard[index_row][index_col].isRevealed ?
                                                    (GameBoard[index_row][index_col].value !== 9 ?
                                                        '#ffd9a9'
                                                        :
                                                        GameBoard[index_row][index_col].flag ?
                                                            '#d97720'
                                                            :
                                                            '#dc3545'
                                                    )
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
                                            {(GameBoard[index_row][index_col].isRevealed ?//Được mở mới hiện số, không thì kiểm tra có cờ không
                                                (checkSurroundingCells(index_row, index_col) !== 9 ?//In ra số nếu không phải bom
                                                    (checkSurroundingCells(index_row, index_col) !== 0 &&//Khác 0 mới hiện số
                                                        checkSurroundingCells(index_row, index_col)
                                                    )
                                                    :
                                                    <i className='fa-solid fa-bomb'></i>//In ra quả bom
                                                )
                                                :
                                                (GameBoard[index_row][index_col].flag &&//Nếu được cắm cờ thì hiện cờ
                                                    <i className='fa-solid fa-flag' style={{ color: 'red' }}></i>
                                                )
                                            )}
                                        </p>
                                        {SelectedGameMode === 'Test' &&
                                            <p>
                                                {checkSurroundingCells(index_row, index_col)}
                                            </p>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='detail'>
                    <div>
                        <div className='support'>
                            <h3><i className='fa-solid fa-flag' style={{ color: 'red' }}></i> <b>{Flag}</b></h3>
                            <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
                        </div>
                        <Form.Group controlId='gamemode' className='form-group'>
                            <Form.Control
                                as='select'
                                value={SelectedGameMode}
                                onChange={(e) => { changeGameMode(e.target.value), setSelectedGameMode(e.target.value) }}
                                className={
                                    SelectedGameMode === 'Easy' ?
                                        'gamemode-option easy-mode'
                                        :
                                        (SelectedGameMode === 'Normal' ?
                                            'gamemode-option normal-mode'
                                            :
                                            (SelectedGameMode === 'Hard' ?
                                                'gamemode-option hard-mode'
                                                :
                                                'gamemode-option test-mode'
                                            )
                                        )
                                }
                            >
                                <option className='gamemode-option easy-mode' value='Easy'>Easy</option>
                                <option className='gamemode-option normal-mode' value='Normal'>Normal</option>
                                <option className='gamemode-option hard-mode' value='Hard'>Hard</option>
                                <option className='gamemode-option test-mode' value='Test'>Test</option>
                            </Form.Control>
                        </Form.Group>

                        <div className='runtime'>
                            {Time !== -1 && <h3>Time: <b>{Time}</b></h3>}
                        </div>
                    </div>

                    <div className='result'
                        style={{
                            border:
                                HasWon === 1 ?
                                    '4px solid #28a745'
                                    :
                                    (HasWon === 2 ?
                                        '4px solid #dc3545'
                                        :
                                        'none'
                                    )
                        }}
                    >
                        {HasWon === 1 && <h2 style={{ color: '#28a745' }}><b>YOU WON!</b></h2>}
                        {HasWon === 2 && <h2 style={{ color: '#dc3545' }}><b>YOU LOST!</b></h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}
