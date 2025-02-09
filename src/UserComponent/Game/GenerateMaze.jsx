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
        const ResetMaze = Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1));
        setMaze(ResetMaze);
        setPath([[0, 0]]);
        setStack([[0, 0]]);
    }, [Refresh, MazeWidth, MazeHeight]);




    //generateMazeDFS(0, 0, [9, 9], Path)
    const generateMazeDFS = async (row, col, RandomDirection, Path) => {

        const NewMaze = [...Maze];

        let NewRow = null;
        let NewCol = null;
        const Directions = [[2, 0], [0, 2], [-2, 0], [0, -2]];
        let SubDirections = Directions;

        do {
            // console.log('before', SubDirections);
            SubDirections = SubDirections.filter(dir => !(dir[0] === RandomDirection[0] && dir[1] === RandomDirection[1]));
            // console.log('SubDirections', SubDirections);


            if (SubDirections.length === 0) return;// Khi hết đường đi thì dừng lại
            // console.log('pass1');

            // Khi chỉ còn 1 lối đi duy nhất là đi tới [0, 0] thì dừng lại
            // if (NewRow === 0 && NewCol === 0) return;
            // if (SubDirections.length === 1 && NewRow === 0 && NewCol === 0) return;
            if (SubDirections[0] === -2 && SubDirections[1] === 0 && NewRow === 0 && NewCol === 0) return;
            if (SubDirections[0] === 0 && SubDirections[1] === -2 && NewRow === 0 && NewCol === 0) return;
            // console.log('pass2');

            RandomDirection = SubDirections[Math.floor(Math.random() * SubDirections.length)];
            NewRow = row + RandomDirection[0];
            NewCol = col + RandomDirection[1];

            // console.log('row', row);
            // console.log('col', col);
            // console.log('RandomDirection[0]', RandomDirection[0]);
            // console.log('RandomDirection[1]', RandomDirection[1]);
            // console.log('NewRow', NewRow);
            // console.log('NewCol', NewCol);

            // console.log('after', SubDirections);
        } while (NewRow < 0 || NewRow >= Maze.length || NewCol < 0 || NewCol >= Maze[0].length || NewMaze[NewRow][NewCol] !== 1 || Stack.includes([NewRow, NewCol]))

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(10);

        NewMaze[row][col] = 0;
        NewMaze[NewRow][NewCol] = 0;
        NewMaze[(row + NewRow) / 2][(col + NewCol) / 2] = 0;
        setMaze(NewMaze);

        const newPath = [...Path, [NewRow, NewCol]];
        // setPath(newPath);
        const newStack = [...Stack, [NewRow, NewCol]];
        setStack(newStack);

        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]], newPath);
        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]], newPath);
        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]], newPath);
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

            <Form>
                <div className='width-height-control'>
                    <Button onClick={() => { if (MazeWidth >= 10) setMazeWidth(MazeWidth - 10) }} className='btn'>- 10</Button>
                    <Button onClick={() => { if (MazeWidth > 0) setMazeWidth(MazeWidth - 1) }} className='btn'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Form.Group controlId='mazewidth' className='form-group'>
                        <Form.Control type='text' min={0} max={100} value={MazeWidth} placeholder='Maze Width' readOnly />
                    </Form.Group>
                    <Button onClick={() => { if (MazeWidth < 100) setMazeWidth(MazeWidth + 1) }} className='btn'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={() => { if (MazeWidth <= 90) setMazeWidth(MazeWidth + 10) }} className='btn'>+ 10</Button>
                </div>

                <div className='width-height-control'>
                    <Button onClick={() => { if (MazeHeight >= 10) setMazeHeight(MazeHeight - 10) }} className='btn'>- 10</Button>
                    <Button onClick={() => { if (MazeHeight > 0) setMazeHeight(MazeHeight - 1) }} className='btn'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Form.Group controlId='mazeheight' className='form-group'>
                        <Form.Control type='text' min={0} max={100} value={MazeHeight} placeholder='Maze Height' readOnly />
                    </Form.Group>
                    <Button onClick={() => { if (MazeHeight < 100) setMazeHeight(MazeHeight + 1) }} className='btn'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={() => { if (MazeHeight <= 90) setMazeHeight(MazeHeight + 10) }} className='btn'>+ 10</Button>
                </div>
            </Form>
            <Button onClick={() => setRefresh(Refresh + 1)} className='btn btn-reset'>Refresh</Button>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0], Path)} className='btn btn-generate'>GENERATE DFS</Button>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0], Path)} className='btn btn-generate'>GENERATE PRIM</Button>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0], Path)} className='btn btn-generate'>GENERATE KRUSKAL</Button>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0], Path)} className='btn btn-generate'>GENERATE ELLER</Button>

            <pre>{JSON.stringify(Maze, null, 0).replace(/,\n/g, ',').replace(/],/g, '],\n')}</pre>
        </div>
    )
}
