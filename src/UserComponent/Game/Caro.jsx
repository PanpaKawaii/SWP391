import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import './Caro.css';

export default function Caro() {

    const [GameMode, setGameMode] = useState({
        rowCount: 24,
        colCount: 24,
        constantToWin: 5
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('LargeMap');

    const changeGameMode = (Mode) => {
        const newGameMode = { ...GameMode };
        if (Mode === 'LargeMap') {
            newGameMode.rowCount = 24;
            newGameMode.colCount = 24;
            newGameMode.constantToWin = 5;
        } else if (Mode === 'TicTacToe') {
            newGameMode.rowCount = 3;
            newGameMode.colCount = 3;
            newGameMode.constantToWin = 3;
        } else {
            newGameMode.rowCount = 10;
            newGameMode.colCount = 10;
            newGameMode.constantToWin = 4;
        }
        console.log('Set Game Mode', newGameMode.bombNumber);
        const newPlayTable = Array(newGameMode.rowCount).fill(0).map(() =>
            Array(newGameMode.colCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(newPlayTable);
        setGameMode(newGameMode);
    }





    const [TicTacToe, setTicTacToe] = useState({
        rowCount: 3,
        colCount: 3,
        constantToWin: 3
    });

    const [LargeMap, setLargeMap] = useState({
        rowCount: 24,
        colCount: 24,
        constantToWin: 5
    });


    const [Player, setPlayer] = useState(1);
    const [HasWon, setHasWon] = useState(0);
    const [Refresh, setRefresh] = useState(0);
    const [LastStep, setLastStep] = useState({
        row: null,
        col: null
    });

    const [PlayTable, setPlayTable] = useState(Array(GameMode.rowCount).fill(0).map(() =>
        Array(GameMode.colCount).fill(0).map(() => ({ value: 0 }))
    ));

    useEffect(() => {
        const newPlayTable = Array(GameMode.rowCount).fill(0).map(() =>
            Array(GameMode.colCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(newPlayTable);

        setPlayer(1);
        setLastStep({ row: null, col: null });
        setHasWon(0);
    }, [GameMode, Refresh]);

    const MarkCell = (row, col) => {
        if (PlayTable[row][col].value !== 0) return;
        setPlayer(Player === 1 ? 2 : 1);
        const newPlayTable = [...PlayTable];
        newPlayTable[row][col].value = Player;
        setPlayTable(newPlayTable);
        setLastStep({ row, col });
        CheckRow(row);
        CheckCol(col);
        CheckDiagonalDown(row, col);
        CheckDiagonalUp(row, col);
        console.log('End Check!');
    }

    const CheckRow = (row) => {
        let countCol = 0;
        let count = 0;
        for (let i = 0; i < GameMode.colCount; i++) {
            if (PlayTable[row][i].value === Player) {
                count++;
                if (count >= countCol) countCol = count;
                console.log('count col: ', count);
            }
            else count = 0;
        }
        if (countCol >= GameMode.constantToWin) {
            setHasWon(Player);
        }
    }

    const CheckCol = (col) => {
        let countRow = 0;
        let count = 0;
        for (let i = 0; i < GameMode.rowCount; i++) {
            if (PlayTable[i][col].value === Player) {
                count++;
                if (count >= countRow) countRow = count;
                console.log('count row: ', count);
            }
            else count = 0;
        }
        if (countRow >= GameMode.constantToWin) {
            setHasWon(Player);
        }
    }

    const CheckDiagonalDown = (row, col) => {
        let countUp = 0;
        for (let i = 0; i <= row && i <= col; i++) {
            if (PlayTable[row - i][col - i].value === Player) {
                countUp++;
                console.log('countUp: ', countUp);
            } else {
                break;
            }
        }

        let countDown = 0;
        for (let i = 0; row + i < GameMode.rowCount && col + i < GameMode.colCount; i++) {
            if (PlayTable[row + i][col + i].value === Player) {
                countDown++;
                console.log('countUp: ', countDown);
            } else {
                break;
            }
        }

        if (countUp + countDown - 1 >= GameMode.constantToWin) {
            setHasWon(Player);
        }
    }

    const CheckDiagonalUp = (row, col) => {
        let countUp = 0;
        for (let i = 0; i <= row && col + i < GameMode.colCount; i++) {
            if (PlayTable[row - i][col + i].value === Player) {
                countUp++;
                console.log('countUp: ', countUp);
            } else {
                break;
            }
        }

        let countDown = 0;
        for (let i = 0; row + i < GameMode.rowCount && i <= col; i++) {
            if (PlayTable[row + i][col - i].value === Player) {
                countDown++;
                console.log('countUp: ', countDown);
            } else {
                break;
            }
        }

        if (countUp + countDown - 1 >= GameMode.constantToWin) {
            setHasWon(Player);
        }
    }

    return (
        <div className='caro-container'>

            <div className='header'>
                <h1><b>Caro</b></h1>
            </div>

            <div className='game-content'>

                <div className='game-detail'>
                    <div>
                        <div className='support'>
                            <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
                        </div>
                        <Form.Group controlId='gamemode' className='form-group'>
                            <Form.Control
                                as='select'
                                value={SelectedGameMode}
                                onChange={(e) => { changeGameMode(e.target.value), setSelectedGameMode(e.target.value) }}
                                className={
                                    SelectedGameMode === 'LargeMap' ?
                                        'gamemode-option largemap-mode'
                                        :
                                        (SelectedGameMode === 'TicTacToe' ?
                                            'gamemode-option tictactoe-mode'
                                            :
                                            'gamemode-option test-mode'
                                        )
                                }
                            >
                                <option className='gamemode-option largemap-mode' value='LargeMap'>Large Map</option>
                                <option className='gamemode-option tictactoe-mode' value='TicTacToe'>Tic Tac Toe</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className='result-detail'
                        style={{
                            border:
                                HasWon === 1 ?
                                    '4px solid #fd4755'
                                    :
                                    (HasWon === 2 ?
                                        '4px solid #01d0fd'
                                        :
                                        'none'
                                    )
                        }}
                    >
                        {HasWon === 1 && <h2 style={{ color: '#fd4755' }}><b><i className='fa-solid fa-xmark'></i> WON!</b></h2>}
                        {HasWon === 2 && <h2 style={{ color: '#01d0fd' }}><b><i className='fa-regular fa-circle'></i> WON!</b></h2>}
                    </div>
                </div>

            </div>

            <div className='game-content'>

                <Table bordered
                    className='no-wrap align-middle table'
                    style={{
                        '--table-width': GameMode.colCount,
                        '--table-height': GameMode.rowCount,
                        border:
                            HasWon === 1 ?
                                '2px solid #fd4755'
                                :
                                (HasWon === 2 ?
                                    '2px solid #01d0fd'
                                    :
                                    '2px solid #cccccc'
                                ),
                        backgroundColor:
                            HasWon === 1 ?
                                '#fd4755'
                                :
                                (HasWon === 2 ?
                                    '#01d0fd'
                                    :
                                    '#cccccc'
                                ),
                    }}
                >
                    <tbody>
                        {[...Array(GameMode.rowCount)].map((_, index_row) => (
                            <tr key={index_row}>
                                {[...Array(GameMode.colCount)].map((_, index_col) => (
                                    <td
                                        key={index_col}
                                        style={{ backgroundColor: index_row === LastStep.row && index_col === LastStep.col && '#dddddd' }}
                                        onClick={() => { MarkCell(index_row, index_col) }}
                                    >
                                        <p>
                                            {PlayTable[index_row][index_col].value === 1 ?
                                                <i className='fa-solid fa-xmark' style={{ color: '#fd4755' }}></i>
                                                :
                                                (
                                                    PlayTable[index_row][index_col].value === 2 ?
                                                        <i className='fa-regular fa-circle' style={{ color: '#01d0fd' }}></i>
                                                        :
                                                        ''
                                                )
                                            }
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>

        </div>
    )
}
