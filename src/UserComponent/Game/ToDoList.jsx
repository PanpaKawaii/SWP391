import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './ToDoList.css';

export default function ToDoList() {

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
        const newVisitedCells = Array(newMaze.length).fill(0).map(() => Array(newMaze[0].length).fill(false));
        setVisitedCells(newVisitedCells);
        setFound(false);
        setPath([]);
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



    const [List, setList] = useState([{
        id: null,
        isDone: '',
        content: '',
        dateCreate: '',
        lastChange: ''
    }])

    useEffect(() => {
        const ListFromStorage = [];
        for (let i = 0; i < 10; i++) {
            const isDone = localStorage.getItem(`isDone${i}`);
            const content = localStorage.getItem(`content${i}`);
            const dateCreate = localStorage.getItem(`dateCreate${i}`);
            const lastChange = localStorage.getItem(`lastChange${i}`);
            if (content) {
                ListFromStorage.push({
                    id: i,
                    isDone: isDone,
                    content: content,
                    dateCreate: dateCreate,
                    lastChange: lastChange
                });
            }
        }
        setList(ListFromStorage);
    }, []);

    const AddingNote = (content) => {
        let maxId = 0;
        if (List.length > 0) {
            maxId = Math.max(...List.map(item => item.id));
        }
        const newNote = {
            id: maxId + 1,
            isDone: 'NotDone',
            content: content,
            dateCreate: new Date().toISOString(),
            lastChange: new Date().toISOString()
        };
        setList(prevList => [...prevList, newNote]);
        localStorage.setItem(`isDone${maxId + 1}`, newNote.isDone);
        localStorage.setItem(`content${maxId + 1}`, newNote.content);
        localStorage.setItem(`dateCreate${maxId + 1}`, newNote.dateCreate);
        localStorage.setItem(`lastChange${maxId + 1}`, newNote.lastChange);
    }

    const handleAddingNote = (e) => {
        e.preventDefault();
        AddingNote(e.target.addingnote.value);
        e.target.addingnote.value = '';
    }

    return (
        <div className='todolist-container'>
            <div className='header'>
                <h1><b>To Do List</b></h1>
            </div>

            <div>

                <Form onSubmit={handleAddingNote}>
                    <Form.Group controlId='addingnote' className='form-group'>
                        <Form.Control type='text' placeholder='Add note' />
                    </Form.Group>
                    <Button type='submit' className='btn'>ADD</Button>
                    <Button type='reset' className='btn btn-reset'>CLEAR TEXT</Button>
                    <Button className='btn btn-reset' onClick={() => setRefresh(Refresh + 1)}>RESET</Button>
                </Form>

                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <th>Done?</th>
                                <th>Content</th>
                                <th>Date Created</th>
                                <th>Date Changed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {List.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.isDone === 'Done' ? 'Done' : 'Not Done'}</td>
                                    <td>{item.content}</td>
                                    <td>{item.dateCreate}</td>
                                    <td>{item.lastChange}</td>
                                    <td>
                                        <Button onClick={() => changeNote(index, item.id)}>Change</Button>
                                        <Button onClick={() => deleteNote(index, item.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className='todolist-content'>

                <h2><b>Animation Calculation</b></h2>
                <Table
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
                            <tbody className='tablebody'>
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
        </div>
    )
}
