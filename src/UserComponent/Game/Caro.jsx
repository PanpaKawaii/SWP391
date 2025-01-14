import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import './Caro.css';

export default function Caro() {

    const [GameMode, setGameMode] = useState({
        rowCount: 24,
        colCount: 20,
        constantToWin: 5
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('LargeMap');

    const changeGameMode = (Mode) => {
        const newGameMode = { ...GameMode };
        if (Mode === 'LargeMap') {
            newGameMode.rowCount = 24;
            newGameMode.colCount = 20;
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
        colCount: 20,
        constantToWin: 5
    });



    const [Player, setPlayer] = useState(1);
    const [HasWon, setHasWon] = useState(0);
    const [ConstantCell, setConstantCell] = useState([]);
    const [Refresh, setRefresh] = useState(0);
    const [Path, setPath] = useState([]);
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
        setPath([]);
        setLastStep({ row: null, col: null });
        setHasWon(0);
        setConstantCell([]);
    }, [GameMode, Refresh]);

    const MarkCell = (row, col) => {
        if (PlayTable[row][col].value !== 0 || HasWon !== 0) return;

        setPlayer(Player === 1 ? 2 : 1);
        const newPlayTable = [...PlayTable];
        newPlayTable[row][col].value = Player;
        setPlayTable(newPlayTable);

        const newPath = [...Path, [row, col]];
        setPath(newPath);
        setLastStep({ row, col });
        console.log('Path:', newPath);

        CheckRow(row, col);
        CheckCol(row, col);
        CheckDiagonalDown(row, col);
        CheckDiagonalUp(row, col);
        console.log('ConstantCell', ConstantCell);
        console.log('End Check!');
    }

    const CheckRow = (row, col) => {
        let newConstantCell = [...ConstantCell];

        let countLeft = 0;
        for (let i = 0; i <= col; i++) {
            if (PlayTable[row][col - i].value === Player) {
                countLeft++;
                newConstantCell = [...newConstantCell, [row, col - i]];
                console.log('countLeft: ', countLeft);
            } else {
                break;
            }
        }

        let countRight = 0;
        for (let i = 0; col + i < GameMode.colCount; i++) {
            if (PlayTable[row][col + i].value === Player) {
                countRight++;
                newConstantCell = [...newConstantCell, [row, col + i]];
                console.log('countRight: ', countRight);
            } else {
                break;
            }
        }

        if (countLeft + countRight - 1 >= GameMode.constantToWin) {
            setConstantCell(newConstantCell);
            console.log('newConstantCell', newConstantCell);
            setHasWon(Player);
        }

        // let countCol = 0;
        // let count = 0;
        // let newConstantCell = [...ConstantCell];
        // for (let i = 0; i < GameMode.colCount; i++) {
        //     if (PlayTable[row][i].value === Player) {
        //         count++;
        //         newConstantCell = [...newConstantCell, [row, i]];
        //         if (count >= countCol) countCol = count;
        //         console.log('count col: ', count);
        //         if (count >= GameMode.constantToWin) break;
        //     }
        //     else {
        //         count = 0;
        //         newConstantCell = [];
        //     }
        // }
        // if (countCol >= GameMode.constantToWin) {
        //     setConstantCell(newConstantCell);
        //     console.log('newConstantCell', newConstantCell);
        //     setHasWon(Player);
        // }
    }

    const CheckCol = (row, col) => {
        let newConstantCell = [...ConstantCell];

        let countUp = 0;
        for (let i = 0; i <= row; i++) {
            if (PlayTable[row - i][col].value === Player) {
                countUp++;
                newConstantCell = [...newConstantCell, [row - i, col]];
                console.log('countUp: ', countUp);
            } else {
                break;
            }
        }

        let countDown = 0;
        for (let i = 0; row + i < GameMode.rowCount; i++) {
            if (PlayTable[row + i][col].value === Player) {
                countDown++;
                newConstantCell = [...newConstantCell, [row + i, col]];
                console.log('countDown: ', countDown);
            } else {
                break;
            }
        }

        if (countUp + countDown - 1 >= GameMode.constantToWin) {
            setConstantCell(newConstantCell);
            console.log('newConstantCell', newConstantCell);
            setHasWon(Player);
        }

        // let countRow = 0;
        // let count = 0;
        // let newConstantCell = [...ConstantCell];
        // for (let i = 0; i < GameMode.rowCount; i++) {
        //     if (PlayTable[i][col].value === Player) {
        //         count++;
        //         newConstantCell = [...newConstantCell, [i, col]];
        //         if (count >= countRow) countRow = count;
        //         console.log('count row: ', count);
        //         if (count >= GameMode.constantToWin) break;
        //     }
        //     else {
        //         count = 0;
        //         newConstantCell = [];
        //     }
        // }
        // if (countRow >= GameMode.constantToWin) {
        //     setConstantCell(newConstantCell);
        //     console.log('newConstantCell', newConstantCell);
        //     setHasWon(Player);
        // }
    }

    const CheckDiagonalDown = (row, col) => {
        let newConstantCell = [...ConstantCell];

        let countUp = 0;
        for (let i = 0; i <= row && i <= col; i++) {
            if (PlayTable[row - i][col - i].value === Player) {
                countUp++;
                newConstantCell = [...newConstantCell, [row - i, col - i]];
                console.log('countUp: ', countUp);
            } else {
                break;
            }
        }

        let countDown = 0;
        for (let i = 0; row + i < GameMode.rowCount && col + i < GameMode.colCount; i++) {
            if (PlayTable[row + i][col + i].value === Player) {
                countDown++;
                newConstantCell = [...newConstantCell, [row + i, col + i]];
                console.log('countUp: ', countDown);
            } else {
                break;
            }
        }

        if (countUp + countDown - 1 >= GameMode.constantToWin) {
            setConstantCell(newConstantCell);
            console.log('newConstantCell', newConstantCell);
            setHasWon(Player);
        }
    }

    const CheckDiagonalUp = (row, col) => {
        let newConstantCell = [...ConstantCell];

        let countUp = 0;
        for (let i = 0; i <= row && col + i < GameMode.colCount; i++) {
            if (PlayTable[row - i][col + i].value === Player) {
                countUp++;
                newConstantCell = [...newConstantCell, [row - i, col + i]];
                console.log('countUp: ', countUp);
            } else {
                break;
            }
        }

        let countDown = 0;
        for (let i = 0; row + i < GameMode.rowCount && i <= col; i++) {
            if (PlayTable[row + i][col - i].value === Player) {
                countDown++;
                newConstantCell = [...newConstantCell, [row + i, col - i]];
                console.log('countUp: ', countDown);
            } else {
                break;
            }
        }

        if (countUp + countDown - 1 >= GameMode.constantToWin) {
            setConstantCell(newConstantCell);
            console.log('newConstantCell', newConstantCell);
            setHasWon(Player);
        }
    }

    const RemarkCell = () => {
        if (Path.length <= 0) {
            console.log('Path.length <= 0');
            return;
        }

        setHasWon(0);
        setConstantCell([]);
        setPlayer(Player === 1 ? 2 : 1);

        const lastPath = Path.pop();
        console.log(lastPath);
        const newPlayTable = [...PlayTable];
        newPlayTable[lastPath[0]][lastPath[1]].value = 0;
        setPlayTable(newPlayTable);

        if (Path.length <= 0) {
            setLastStep({ row: null, col: null });
        } else {
            const nextLastPath = Path[Path.length - 1];
            setLastStep({ row: nextLastPath[0], col: nextLastPath[1] });
        }
    }

    return (
        <div className='caro-container'>

            <div className='header'>
                <h1><b>CARO</b></h1>
            </div>

            <div className='game-content'>

                <div className='game-detail'>
                    <div>
                        <div className='support'>
                            <Button className='btn' onClick={() => RemarkCell()}>REMARK</Button>
                            <Button className='btn btn-reset' onClick={() => setRefresh(Refresh + 1)}>RESTART</Button>
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
                                <option className='gamemode-option' value='LargeMap'>Large Map</option>
                                <option className='gamemode-option' value='TicTacToe'>Tic Tac Toe</option>
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
                                        style={{
                                            backgroundColor:
                                                ConstantCell.some(cell => cell[0] === index_row && cell[1] === index_col) ?
                                                    (PlayTable[index_row][index_col].value === 1 ?
                                                        '#ffa2aa'
                                                        :
                                                        (PlayTable[index_row][index_col].value === 2 ?
                                                            '#80e8ff'
                                                            :
                                                            'none'
                                                        )
                                                    )
                                                    :
                                                    ((index_row === LastStep.row && index_col === LastStep.col) && '#eeeeee')
                                        }}
                                        className={
                                            (PlayTable[index_row][index_col].value === 0 && Player === 1) ?
                                                'PutX'
                                                :
                                                (PlayTable[index_row][index_col].value === 0 && Player === 2) ?
                                                    'PutO'
                                                    :
                                                    ''
                                        }
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
