import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './Chess.css';

export default function Chess() {

    const [GameMode, setGameMode] = useState({
        RowCount: 8,
        ColCount: 8,
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

    // const [PlayTable, setPlayTable] = useState(Array(GameMode.RowCount).fill(0).map(() =>
    //     Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
    // ));

    const [PlayTable, setPlayTable] = useState([]);

    const InitialPlayTable = [
        [-5, -4, -3, -2, -1, -3, -4, -5],
        [-6, -6, -6, -6, -6, -6, -6, -6],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [6, 6, 6, 6, 6, 6, 6, 6],
        [5, 4, 3, 2, 1, 3, 4, 5]
    ]

    useEffect(() => {
        setPlayTable(InitialPlayTable);

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
        <div className='chess-container'>
            <div className='header'>
                <h1><b>CHESS</b></h1>
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
                    {HasWon === 1 && <h2 ><b><i className='fa-solid fa-xmark'></i> WON!</b></h2>}
                    {HasWon === 2 && <h2 style={{ color: '#01d0fd' }}><b><i className='fa-regular fa-circle'></i> WON!</b></h2>}
                </div>
            </div>

            <div className='content'>
                <Table bordered
                    className='no-wrap align-middle table'
                    style={{
                        '--table-width': GameMode.ColCount,
                        '--table-height': GameMode.RowCount
                    }}
                >
                    <tbody>
                        {PlayTable.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td
                                        key={index_col}
                                        className={
                                            cell === 0 && Player === 1 ? 'PutX' :
                                                cell === 0 && Player === 2 ? 'PutO' : ''
                                        }
                                        style={{ backgroundColor: (index_row + index_col) % 2 === 0 ? '#ddd' : '#999' }}
                                        onClick={() => { MarkCell(index_row, index_col) }}
                                    >
                                        {cell === -1 && <i className='fa-regular fa-chess-king black-side'></i>}
                                        {cell === -2 && <i className='fa-regular fa-chess-queen black-side'></i>}
                                        {cell === -3 && <i className='fa-regular fa-chess-bishop black-side'></i>}
                                        {cell === -4 && <i className='fa-regular fa-chess-knight black-side'></i>}
                                        {cell === -5 && <i className='fa-regular fa-chess-rook black-side'></i>}
                                        {cell === -6 && <i className='fa-regular fa-chess-pawn black-side'></i>}

                                        {cell === 1 && <i className='fa-regular fa-chess-king white-side'></i>}
                                        {cell === 2 && <i className='fa-regular fa-chess-queen white-side'></i>}
                                        {cell === 3 && <i className='fa-regular fa-chess-bishop white-side'></i>}
                                        {cell === 4 && <i className='fa-regular fa-chess-knight white-side'></i>}
                                        {cell === 5 && <i className='fa-regular fa-chess-rook white-side'></i>}
                                        {cell === 6 && <i className='fa-regular fa-chess-pawn white-side'></i>}
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
