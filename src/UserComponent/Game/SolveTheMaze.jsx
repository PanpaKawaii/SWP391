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
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    ]);

    const [Maze1, setMaze1] = useState([
        [2, 1, 1],
        [0, 0, 1],
        [1, 0, 3]
    ]);

    const [Maze2, setMaze2] = useState([
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

    const [Maze3, setMaze3] = useState([
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

    const [Maze4, setMaze4] = useState([
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

    const [Maze5, setMaze5] = useState([
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
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    ]);

    const [VisitedCells, setVisitedCells] = useState(Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false)));
    const [Found, setFound] = useState(false);
    const [Path, setPath] = useState([]);
    const [Refresh, setRefresh] = useState(0);

    const setCurrentMaze = (MazeNumber) => {
        let newMaze;
        switch (MazeNumber) {
            case 1:
                newMaze = [...Maze1];
                break;
            case 2:
                newMaze = [...Maze2];
                break;
            case 3:
                newMaze = [...Maze3];
                break;
            case 4:
                newMaze = [...Maze4];
                break;
            case 5:
                newMaze = [...Maze5];
                break;
            default:
                newMaze = [...Maze];
                break;
        }
        setMaze(newMaze);
    }

    useEffect(() => {
        const newVisitedCells = Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false));
        setVisitedCells(newVisitedCells);
        setFound(false);
        setPath([]);
    }, [Refresh]);

    const visitCell = async (row, col, Path) => {
        const newVisitedCells = [...VisitedCells];
        const newMaze = [...Maze];
        if (newMaze[row][col] === 1 || newVisitedCells[row][col] === true) {
            console.log('Refuse');
            return;
        }
        console.log('Activate');

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

    const handleAddingMaze = (e) => {
        e.preventDefault();
        setMaze(JSON.parse(e.target.yourmaze.value));
    }

    return (
        <div className='solvethemaze-container'>
            <div className='header'>
                <h1><b>Solve The Maze</b></h1>
            </div>

            <div className='solvethemaze-content'>

                <h2><b>Calculating</b></h2>
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
                                            color: VisitedCells[index_row][index_col] === true && '#ffffff',
                                        }}
                                        onClick={() => { visitCell(index_row, index_col, Path) }}
                                    >
                                        <p>{index_row}-{index_col}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h2><b>Final Path</b></h2>
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
                                        <p>{index_row}-{index_col}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* <Table
                    className='no-wrap align-middle table'
                    style={{ '--table-width': VisitedCells[0].length, }}
                >
                    <tbody>
                        {VisitedCells.map((row, index_row) => (
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
                <div className='solved-path'>
                    <div>
                        <h3><b>Path:</b></h3>
                        {Path.map((step, index) => (
                            <span key={index}>{(index % 8 === 0 && index !== 0) ? <br /> : ''}[{step[0]}-{step[1]}] </span>
                        ))}
                    </div>
                    <div>
                        <h3><b>Count:</b> {Path.length}</h3>
                    </div>
                </div>
            }

            <Form onSubmit={handleAddingMaze}>
                <Form.Group controlId='yourmaze' className='form-group'>
                    <Form.Control as='textarea' placeholder='Add your maze' />
                </Form.Group>
                <Button type='submit' className='btn'>ADD</Button>
                <Button type='reset' className='btn btn-reset'>CLEAR</Button>
                <Button className='btn btn-reset' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
            </Form>

            <div className='available-maze'>
                <h3><b>Available Maze</b></h3>
                <span>
                    {[1, 2, 3, 4, 5].map((maze, index) => (
                        <Button
                            key={index}
                            className='btn'
                            style={{
                                backgroundColor: `hsl(${index * 48 % 360}, 100%, 70%)`,
                                color: `hsl(${index * 48 % 360}, 100%, 30%)`,
                            }}
                            onClick={() => setCurrentMaze(maze)}
                        >
                            Maze {maze}
                        </Button>
                    ))}
                </span>
            </div>
        </div>
    )
}
