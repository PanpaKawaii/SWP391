import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './Caro.css';

export default function Caro() {

    const [GameMode, setGameMode] = useState({
        RowCount: 24,
        ColCount: 20,
        ConstantToWin: 5
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('LargeMap');

    const changeGameMode = (Mode) => {
        const NewGameMode = { ...GameMode };
        if (Mode === 'LargeMap') {
            NewGameMode.RowCount = 24;
            NewGameMode.ColCount = 20;
            NewGameMode.ConstantToWin = 5;
        } else if (Mode === 'TicTacToe') {
            NewGameMode.RowCount = 3;
            NewGameMode.ColCount = 3;
            NewGameMode.ConstantToWin = 3;
        } else {
            NewGameMode.RowCount = 10;
            NewGameMode.ColCount = 10;
            NewGameMode.ConstantToWin = 4;
        }
        console.log('Set Game Mode', Mode);
        const NewPlayTable = Array(NewGameMode.RowCount).fill(0).map(() =>
            Array(NewGameMode.ColCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(NewPlayTable);
        setGameMode(NewGameMode);
    }



    const [Player, setPlayer] = useState(1);
    const [HasWon, setHasWon] = useState(0);
    const [ConstantCell, setConstantCell] = useState([]);
    const [Refresh, setRefresh] = useState(0);
    const [Path, setPath] = useState([]);
    const [LastStep, setLastStep] = useState({
        row: null,
        col: null
    });

    const [PlayTable, setPlayTable] = useState(Array(GameMode.RowCount).fill(0).map(() =>
        Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
    ));

    useEffect(() => {
        const NewPlayTable = Array(GameMode.RowCount).fill(0).map(() =>
            Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(NewPlayTable);

        setPlayer(1);
        setPath([]);
        setLastStep({ row: null, col: null });
        setHasWon(0);
        setConstantCell([]);
    }, [GameMode, Refresh]);

    const MarkCell = (row, col) => {
        if (PlayTable[row][col].value !== 0 || HasWon !== 0) return;

        setPlayer(Player === 1 ? 2 : 1);
        const NewPlayTable = [...PlayTable];
        NewPlayTable[row][col].value = Player;
        setPlayTable(NewPlayTable);

        const NewPath = [...Path, [row, col]];
        setPath(NewPath);
        setLastStep({ row, col });
        console.log('Path:', NewPath);

        checkRow(row, col);
        checkCol(row, col);
        checkDiagonalDown(row, col);
        checkDiagonalUp(row, col);
        console.log('ConstantCell', ConstantCell);
        console.log('End Check!');
    }

    const checkRow = (row, col) => {
        let NewConstantCell = [...ConstantCell];

        let CountLeft = 0;
        for (let i = 0; i <= col; i++) {
            if (PlayTable[row][col - i].value === Player) {
                CountLeft++;
                NewConstantCell = [...NewConstantCell, [row, col - i]];
                console.log('CountLeft: ', CountLeft);
            } else {
                break;
            }
        }

        let CountRight = 0;
        for (let i = 0; col + i < GameMode.ColCount; i++) {
            if (PlayTable[row][col + i].value === Player) {
                CountRight++;
                NewConstantCell = [...NewConstantCell, [row, col + i]];
                console.log('CountRight: ', CountRight);
            } else {
                break;
            }
        }

        if (CountLeft + CountRight - 1 >= GameMode.ConstantToWin) {
            setConstantCell(NewConstantCell);
            console.log('NewConstantCell', NewConstantCell);
            setHasWon(Player);
        }

        // let countCol = 0;
        // let count = 0;
        // let NewConstantCell = [...ConstantCell];
        // for (let i = 0; i < GameMode.ColCount; i++) {
        //     if (PlayTable[row][i].value === Player) {
        //         count++;
        //         NewConstantCell = [...NewConstantCell, [row, i]];
        //         if (count >= countCol) countCol = count;
        //         console.log('count col: ', count);
        //         if (count >= GameMode.ConstantToWin) break;
        //     }
        //     else {
        //         count = 0;
        //         NewConstantCell = [];
        //     }
        // }
        // if (countCol >= GameMode.ConstantToWin) {
        //     setConstantCell(NewConstantCell);
        //     console.log('NewConstantCell', NewConstantCell);
        //     setHasWon(Player);
        // }
    }

    const checkCol = (row, col) => {
        let NewConstantCell = [...ConstantCell];

        let CountUp = 0;
        for (let i = 0; i <= row; i++) {
            if (PlayTable[row - i][col].value === Player) {
                CountUp++;
                NewConstantCell = [...NewConstantCell, [row - i, col]];
                console.log('CountUp: ', CountUp);
            } else {
                break;
            }
        }

        let CountDown = 0;
        for (let i = 0; row + i < GameMode.RowCount; i++) {
            if (PlayTable[row + i][col].value === Player) {
                CountDown++;
                NewConstantCell = [...NewConstantCell, [row + i, col]];
                console.log('CountDown: ', CountDown);
            } else {
                break;
            }
        }

        if (CountUp + CountDown - 1 >= GameMode.ConstantToWin) {
            setConstantCell(NewConstantCell);
            console.log('NewConstantCell', NewConstantCell);
            setHasWon(Player);
        }

        // let countRow = 0;
        // let count = 0;
        // let NewConstantCell = [...ConstantCell];
        // for (let i = 0; i < GameMode.RowCount; i++) {
        //     if (PlayTable[i][col].value === Player) {
        //         count++;
        //         NewConstantCell = [...NewConstantCell, [i, col]];
        //         if (count >= countRow) countRow = count;
        //         console.log('count row: ', count);
        //         if (count >= GameMode.ConstantToWin) break;
        //     }
        //     else {
        //         count = 0;
        //         NewConstantCell = [];
        //     }
        // }
        // if (countRow >= GameMode.ConstantToWin) {
        //     setConstantCell(NewConstantCell);
        //     console.log('NewConstantCell', NewConstantCell);
        //     setHasWon(Player);
        // }
    }

    const checkDiagonalDown = (row, col) => {
        let NewConstantCell = [...ConstantCell];

        let CountUp = 0;
        for (let i = 0; i <= row && i <= col; i++) {
            if (PlayTable[row - i][col - i].value === Player) {
                CountUp++;
                NewConstantCell = [...NewConstantCell, [row - i, col - i]];
                console.log('CountUp: ', CountUp);
            } else {
                break;
            }
        }

        let CountDown = 0;
        for (let i = 0; row + i < GameMode.RowCount && col + i < GameMode.ColCount; i++) {
            if (PlayTable[row + i][col + i].value === Player) {
                CountDown++;
                NewConstantCell = [...NewConstantCell, [row + i, col + i]];
                console.log('CountDown: ', CountDown);
            } else {
                break;
            }
        }

        if (CountUp + CountDown - 1 >= GameMode.ConstantToWin) {
            setConstantCell(NewConstantCell);
            console.log('NewConstantCell', NewConstantCell);
            setHasWon(Player);
        }
    }

    const checkDiagonalUp = (row, col) => {
        let NewConstantCell = [...ConstantCell];

        let CountUp = 0;
        for (let i = 0; i <= row && col + i < GameMode.ColCount; i++) {
            if (PlayTable[row - i][col + i].value === Player) {
                CountUp++;
                NewConstantCell = [...NewConstantCell, [row - i, col + i]];
                console.log('CountUp: ', CountUp);
            } else {
                break;
            }
        }

        let CountDown = 0;
        for (let i = 0; row + i < GameMode.RowCount && i <= col; i++) {
            if (PlayTable[row + i][col - i].value === Player) {
                CountDown++;
                NewConstantCell = [...NewConstantCell, [row + i, col - i]];
                console.log('CountDown: ', CountDown);
            } else {
                break;
            }
        }

        if (CountUp + CountDown - 1 >= GameMode.ConstantToWin) {
            setConstantCell(NewConstantCell);
            console.log('NewConstantCell', NewConstantCell);
            setHasWon(Player);
        }
    }

    const remarkCell = () => {
        if (Path.length <= 0) {
            console.log('Path.length <= 0');
            return;
        }

        setHasWon(0);
        setConstantCell([]);
        setPlayer(Player === 1 ? 2 : 1);

        const LastPath = Path.pop();
        console.log(LastPath);
        const NewPlayTable = [...PlayTable];
        NewPlayTable[LastPath[0]][LastPath[1]].value = 0;
        setPlayTable(NewPlayTable);

        if (Path.length <= 0) {
            setLastStep({ row: null, col: null });
        } else {
            const NextLastPath = Path[Path.length - 1];
            setLastStep({ row: NextLastPath[0], col: NextLastPath[1] });
        }
    }

    return (
        <div className='caro-container'>
            <div className='header'>
                <h1><b>CARO</b></h1>
            </div>

            <div className='detail'>
                <div>
                    <div className='support'>
                        <Button className='btn' style={{ backgroundColor: Player === 1 ? '#fd4755' : (Player === 2 ? '#01d0fd' : '') }} onClick={() => remarkCell()}><i className='fa-solid fa-reply'></i></Button>
                        <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESTART</Button>
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

                <div className='result'
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

            <div className='content'>
                <Table bordered
                    className='no-wrap align-middle table'
                    style={{
                        '--table-width': GameMode.ColCount,
                        '--table-height': GameMode.RowCount,
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
                        {[...Array(GameMode.RowCount)].map((_, index_row) => (
                            <tr key={index_row}>
                                {[...Array(GameMode.ColCount)].map((_, index_col) => (
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
