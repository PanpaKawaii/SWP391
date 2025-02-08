import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './GenerateMaze.css';

export default function GenerateMaze() {
    // const [MazeWidth, setMazeWidth] = useState(7);
    // const [MazeHeight, setMazeHeight] = useState(7);
    const [MazeWidth, setMazeWidth] = useState(45);
    const [MazeHeight, setMazeHeight] = useState(45);
    const [Maze, setMaze] = useState(Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1)));

    const [Path, setPath] = useState([[0, 0]]);
    const [Stack, setStack] = useState([[0, 0]]);
    const [Refresh, setRefresh] = useState(0);

    useEffect(() => {
        const resetMaze = Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1));
        setMaze(resetMaze);
        setPath([[0, 0]]);
        setStack([[0, 0]]);
    }, [Refresh, MazeWidth, MazeHeight]);



    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const directions = [[2, 0], [0, 2], [-2, 0], [0, -2]];

    //generateMazeDFS(0, 0, [9, 9], Path)
    const generateMazeDFS = async (row, col, randomDirection, Path) => {

        const newMaze = [...Maze];

        let newRow = null;
        let newCol = null;
        let subDirections = directions;
        do {
            console.log('before', subDirections);
            subDirections = subDirections.filter(dir => !(dir[0] === randomDirection[0] && dir[1] === randomDirection[1]));
            console.log('subDirections', subDirections);
            // Khi hết đường đi thì dừng lại
            if (subDirections.length === 0) return;
            console.log('pass1');

            // Khi chỉ còn 1 lối đi duy nhất là đi tới [0, 0] thì dừng lại
            // if (newRow === 0 && newCol === 0) return;
            // if (subDirections.length === 1 && newRow === 0 && newCol === 0) return;
            if (subDirections[0] === -2 && subDirections[1] === 0 && newRow === 0 && newCol === 0) return;
            if (subDirections[0] === 0 && subDirections[1] === -2 && newRow === 0 && newCol === 0) return;
            console.log('pass2');

            randomDirection = subDirections[Math.floor(Math.random() * subDirections.length)];
            newRow = row + randomDirection[0];
            newCol = col + randomDirection[1];

            console.log('row', row);
            console.log('col', col);
            console.log('randomDirection[0]', randomDirection[0]);
            console.log('randomDirection[1]', randomDirection[1]);
            console.log('newRow', newRow);
            console.log('newCol', newCol);

            console.log('after', subDirections);
        } while (newRow < 0 || newRow >= Maze.length || newCol < 0 || newCol >= Maze[0].length || newMaze[newRow][newCol] !== 1 || Stack.includes([newRow, newCol]))

        await sleep(10);
        newMaze[row][col] = 0;
        newMaze[newRow][newCol] = 0;
        newMaze[(row + newRow) / 2][(col + newCol) / 2] = 0;
        setMaze(newMaze);

        const newPath = [...Path, [newRow, newCol]];
        // setPath(newPath);
        const newStack = [...Stack, [newRow, newCol]];
        setStack(newStack);

        await generateMazeDFS(newRow, newCol, [-randomDirection[0], -randomDirection[1]], newPath);
        await generateMazeDFS(newRow, newCol, [-randomDirection[0], -randomDirection[1]], newPath);
        await generateMazeDFS(newRow, newCol, [-randomDirection[0], -randomDirection[1]], newPath);
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
                                    >
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
                    <i className='fa-solid fa-plus'></i>
                </Button>
                <Button onClick={() => { if (MazeWidth > 0) setMazeWidth(MazeWidth - 1) }} className='btn'>
                    <i className='fa-solid fa-minus'></i>
                </Button>
                <Button onClick={() => { if (MazeWidth <= 90) setMazeWidth(MazeWidth + 10) }} className='btn'>+ 10</Button>
                <Button onClick={() => { if (MazeWidth >= 10) setMazeWidth(MazeWidth - 10) }} className='btn'>- 10</Button>

                <Form.Group controlId='mazeheight' className='form-group'>
                    <Form.Control type='text' min={0} max={100} value={MazeHeight} placeholder='Maze Height' readOnly />
                </Form.Group>
                <Button onClick={() => { if (MazeHeight < 100) setMazeHeight(MazeHeight + 1) }} className='btn'>
                    <i className='fa-solid fa-plus'></i>
                </Button>
                <Button onClick={() => { if (MazeHeight > 0) setMazeHeight(MazeHeight - 1) }} className='btn'>
                    <i className='fa-solid fa-minus'></i>
                </Button>
                <Button onClick={() => { if (MazeHeight <= 90) setMazeHeight(MazeHeight + 10) }} className='btn'>+ 10</Button>
                <Button onClick={() => { if (MazeHeight >= 10) setMazeHeight(MazeHeight - 10) }} className='btn'>- 10</Button>

            </Form>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0], Path)} className='btn'>GENERATE DFS</Button>
            <Button onClick={() => setRefresh(Refresh + 1)} className='btn'>Refresh</Button>

            <pre>{JSON.stringify(Maze, null, 0).replace(/,\n/g, ',').replace(/],/g, '],\n')}</pre>
        </div>
    )
}
