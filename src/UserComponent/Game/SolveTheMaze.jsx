import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './SolveTheMaze.css';

export default function SolveTheMaze() {

    const [Maze, setMaze] = useState([
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ]);

    const [Maze1, setMaze1] = useState([
        [2, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 3]
    ]);

    const [Maze2, setMaze2] = useState([
        [0, 2, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
    ]);

    const [Maze3, setMaze3] = useState([
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
    ]);

    const [Maze4, setMaze4] = useState([
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ]);

    const [Path, setPath] = useState([]);

    const [Found, setFound] = useState(false);
    const [Refresh, setRefresh] = useState(0);
    const [visitedCells, setVisitedCells] = useState(Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false)));

    useEffect(() => {
        const newVisitedCells = Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false));
        setVisitedCells(newVisitedCells);
        setFound(false);
        setPath([]);
    }, [Refresh]);

    const visitCell = async (row, col, Path) => {
        const newVisitedCells = [...visitedCells];
        const newMaze = [...Maze];
        if (newMaze[row][col] === 1 || newVisitedCells[row][col] === true) {
            console.log('Refuse');
            return;
        }
        console.log('Done');

        const newPath = [...Path, [row, col]];
        console.log('Path: ', newPath);

        newVisitedCells[row][col] = true;
        setVisitedCells(newVisitedCells);

        if (newMaze[row][col] === 3) {
            console.log('Found');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            setPath(newPath);
            setFound(true);
            return;
        }

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(100);

        if (newMaze[row][col] !== 1) {
            const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            for (let direction of directions) {
                const newRow = row + direction[0];
                const newCol = col + direction[1];
                if (newRow >= 0 && newRow < Maze.length && newCol >= 0 && newCol < Maze[0].length) {
                    visitCell(newRow, newCol, newPath);
                    // await visitCell(newRow, newCol, newPath);
                }
            }
        }
    }

    return (
        <div className='solvethemaze-container'>
            <div className='header'>
                <h1><b>Solve The Maze</b></h1>
            </div>

            <div className='solvethemaze-content'>
                <Table
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody>
                        {Maze.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            backgroundColor: cell === 2 ?
                                                '#dc3545'
                                                :
                                                (cell === 3 ?
                                                    '#ffc107'
                                                    :
                                                    (cell === 0 ?
                                                        '#28a745'
                                                        :
                                                        '#fb8b24'
                                                    )
                                                ),
                                            color: visitedCells[index_row][index_col] === true && '#ffffff',
                                        }}
                                        onClick={() => { visitCell(index_row, index_col, Path) }}
                                    >
                                        <p style={{ fontSize: '10px' }}>{index_row} - {index_col}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button style={{ margin: '0 20px', height: 'fit-content', fontWeight: 'bold' }} onClick={() => { setRefresh(Refresh + 1) }}>
                    RESET
                </Button>
                <Table
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody>
                        {Maze.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            backgroundColor: cell === 2 ?
                                                '#dc3545'
                                                :
                                                (cell === 3 ?
                                                    '#ffc107'
                                                    :
                                                    (cell === 0 ?
                                                        '#28a745'
                                                        :
                                                        '#fb8b24'
                                                    )
                                                ),
                                            color: Path.some(path => path[0] === index_row && path[1] === index_col) ? '#ffffff' : '',
                                        }}
                                        onClick={() => { visitCell(index_row, index_col, Path) }}
                                    >
                                        <p style={{ fontSize: '10px' }}>{index_row} - {index_col}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <Table
                    className='no-wrap align-middle table'
                    style={{ '--table-width': visitedCells[0].length, }}
                >
                    <tbody>
                        {visitedCells.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col} style={{
                                        backgroundColor: cell ? '#28a745' : '#ffffff'
                                    }}><p>{cell ? 'V' : ''}</p></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table> */}
            </div>
            {Path && Path.length != 0 &&
                <span style={{ fontSize: '20px' }}>
                    <span style={{ fontWeight: 'bold' }}>Path:</span>
                    {Path.map((step, index) => (
                        <span key={index}> [{step[0]} - {step[1]}]</span>
                    ))}
                </span>
            }
        </div>
    )
}
