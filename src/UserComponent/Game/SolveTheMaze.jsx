import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
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
        [0, 1, 3],
        [0, 0, 0]
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
        [0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
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
        let NewMaze;
        switch (MazeNumber) {
            case 1:
                NewMaze = [...Maze1];
                break;
            case 2:
                NewMaze = [...Maze2];
                break;
            case 3:
                NewMaze = [...Maze3];
                break;
            case 4:
                NewMaze = [...Maze4];
                break;
            case 5:
                NewMaze = [...Maze5];
                break;
            default:
                NewMaze = [...Maze];
                break;
        }
        setMaze(NewMaze);
        const NewVisitedCells = Array(NewMaze.length).fill(0).map(() => Array(NewMaze[0].length).fill(false));
        setVisitedCells(NewVisitedCells);
        setFound(false);
        setPath([]);
    }

    useEffect(() => {
        const NewVisitedCells = Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false));
        setVisitedCells(NewVisitedCells);
        setFound(false);
        setPath([]);
    }, [Refresh]);

    const visitCell = async (row, col, Path) => {
        const NewVisitedCells = [...VisitedCells];
        const NewMaze = [...Maze];
        if (NewMaze[row][col] === 1 || NewVisitedCells[row][col] === true) {
            console.log('Refuse');
            return;
        }
        console.log('Activate');

        const NewPath = [...Path, [row, col]];
        console.log('Path: ', NewPath);

        NewVisitedCells[row][col] = true;
        setVisitedCells(NewVisitedCells);

        if (NewMaze[row][col] === 3) {
            console.log('Found');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            setPath(NewPath);
            setFound(true);
            return;
        }

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(50);

        if (NewMaze[row][col] !== 1) {
            const Directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            for (let Direction of Directions) {
                const NewRow = row + Direction[0];
                const NewCol = col + Direction[1];
                if (NewRow >= 0 && NewRow < Maze.length && NewCol >= 0 && NewCol < Maze[0].length) {
                    visitCell(NewRow, NewCol, NewPath);
                    // await visitCell(NewRow, NewCol, NewPath);
                }
            }
        }
    }

    const handleAddingMaze = (e) => {
        e.preventDefault();
        setMaze(JSON.parse(e.target.yourmaze.value));
        const NewVisitedCells = Array((JSON.parse(e.target.yourmaze.value)).length).fill(0).map(() => Array((JSON.parse(e.target.yourmaze.value))[0].length).fill(false));
        setVisitedCells(NewVisitedCells);
        setFound(false);
        setPath([]);
    }

    return (
        <div className='solvethemaze-container'>
            <div className='header'>
                <h1><b>Solve The Maze</b></h1>
            </div>

            <div className='content'>

                <h2><b>Animation Calculation</b></h2>
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

                {Found &&
                    <>
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
                    </>
                }
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
                <Button type='reset' className='btn btn-reset'>CLEAR TEXT</Button>
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
                                backgroundColor: `hsl(${index * 50 % 360}, 100%, 70%)`,
                                color: `hsl(${index * 50 % 360}, 100%, 30%)`,
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
