import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './GenerateMaze.css';

export default function GenerateMaze() {



    const [MazeWidth, setMazeWidth] = useState(45);
    const [MazeHeight, setMazeHeight] = useState(45);
    const [Maze, setMaze] = useState(Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1)));

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
    const [Path, setPath] = useState([]);
    const [Refresh, setRefresh] = useState(0);

    const setCurrentMaze = (MazeNumber) => {
        let newMaze;
        switch (MazeNumber) {
            case 5:
                newMaze = [...Maze5];
                break;
            default:
                newMaze = [...Maze];
                break;
        }
        setMaze(newMaze);
        const newVisitedCells = Array(newMaze.length).fill(0).map(() => Array(newMaze[0].length).fill(false));
        setVisitedCells(newVisitedCells);
        setPath([]);
    }

    useEffect(() => {
        const resetMaze = Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1));
        setMaze(resetMaze);
        // const newVisitedCells = Array(Maze.length).fill(0).map(() => Array(Maze[0].length).fill(false));
        // setVisitedCells(newVisitedCells);
        // setPath([]);
    }, [Refresh, MazeWidth, MazeHeight]);

    const generateMaze = () => {

    }

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
            setPath(newPath);
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

    const handleEditingMaze = (e) => {
        e.preventDefault();
    }

    return (
        <div className='generatemaze-container'>
            <div className='header'>
                <h1><b>Generate Maze</b></h1>
            </div>

            <div className='generatemaze-content'>

                <Table bordered
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody style={{ cursor: 'pointer', userSelect: 'none' }}>
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
                                                        '#64afff'
                                                        :
                                                        '#007bff'
                                                    )
                                                ),
                                        }}
                                        onClick={() => { visitCell(index_row, index_col, Path) }}
                                    >
                                        {/* <p>{index_row}-{index_col}</p> */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {Path && Path.length != 0 &&
                <div className='solved-path'>
                    <div>
                        <h3><b>JSON</b></h3>
                        {Path.map((step, index) => (
                            <span key={index}>{(index % 8 === 0 && index !== 0) ? <br /> : ''}[{step[0]}-{step[1]}] </span>
                        ))}
                    </div>
                </div>
            }

            <Form>
                <Form.Group controlId='mazewidth' className='form-group'>
                    <Form.Control type='text' min={0} max={100} value={MazeWidth} placeholder='Maze Width' readOnly />
                </Form.Group>
                <Button onClick={() => { if (MazeWidth < 100) setMazeWidth(MazeWidth + 1) }} className='btn'>
                    <i className='fa-solid fa-chevron-left'></i> <i className='fa-solid fa-chevron-right'></i>
                </Button>
                <Button onClick={() => { if (MazeWidth > 0) setMazeWidth(MazeWidth - 1) }} className='btn'>
                    <i className='fa-solid fa-chevron-right'></i> <i className='fa-solid fa-chevron-left'></i>
                </Button>

                <Form.Group controlId='mazeheight' className='form-group'>
                    <Form.Control type='text' min={0} max={100} value={MazeHeight} placeholder='Maze Height' readOnly />
                </Form.Group>
                <Button onClick={() => { if (MazeHeight < 100) setMazeHeight(MazeHeight + 1) }} className='btn'>
                    <i className='fa-solid fa-chevron-up'></i><i className='fa-solid fa-chevron-down'></i>
                </Button>
                <Button onClick={() => { if (MazeHeight > 0) setMazeHeight(MazeHeight - 1) }} className='btn'>
                    <i className='fa-solid fa-chevron-down'></i><i className='fa-solid fa-chevron-up'></i>
                </Button>

            </Form>
            <Button onClick={generateMaze()} className='btn'>GENERATE</Button>

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
