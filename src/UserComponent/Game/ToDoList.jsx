import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './ToDoList.css';

export default function ToDoList() {
    const [Refresh, setRefresh] = useState(0);
    const [NewNoteId, setNewNoteId] = useState(null);
    const [List, setList] = useState([{
        id: null,
        isDone: null,
        content: null,
        dateCreate: null,
        lastChange: null
    }])

    useEffect(() => {
        const ListFromStorage = [];
        for (let i = 0; i < 100; i++) {
            const isDone = localStorage.getItem(`isDone${i}`);
            const content = localStorage.getItem(`content${i}`);
            const dateCreate = localStorage.getItem(`dateCreate${i}`);
            const lastChange = localStorage.getItem(`lastChange${i}`);
            if (content !== null) {
                ListFromStorage.push({
                    id: i,
                    isDone: isDone,
                    content: content,
                    dateCreate: dateCreate,
                    lastChange: lastChange
                });
            }
        }
        setList(ListFromStorage.sort((b, a) => a.id - b.id));
    }, [Refresh]);

    const addNote = (content) => {
        let MaxId = 0;
        if (List.length > 0) {
            MaxId = Math.max(...List.map(item => item.id));
        }
        const NewNote = {
            id: MaxId + 1,
            isDone: 'NotDone',
            content: content,
            dateCreate: new Date(new Date().setHours(new Date().getHours() + 7)).toISOString(),
            lastChange: new Date(new Date().setHours(new Date().getHours() + 7)).toISOString()
        };
        localStorage.setItem(`isDone${MaxId + 1}`, NewNote.isDone);
        localStorage.setItem(`content${MaxId + 1}`, NewNote.content);
        localStorage.setItem(`dateCreate${MaxId + 1}`, NewNote.dateCreate);
        localStorage.setItem(`lastChange${MaxId + 1}`, NewNote.lastChange);
        setNewNoteId(NewNote.id);
        setList(PrevList => [...PrevList, NewNote]);
        setRefresh(Refresh + 1);
    }

    const deleteNote = (id) => {
        localStorage.removeItem(`isDone${id}`);
        localStorage.removeItem(`content${id}`);
        localStorage.removeItem(`dateCreate${id}`);
        localStorage.removeItem(`lastChange${id}`);
        setRefresh(Refresh + 1);
    }

    const editCheckBox = (id, checked) => {
        const NewNote = {
            isDone: checked === true ? 'Done' : 'NotDone',
            lastChange: new Date(new Date().setHours(new Date().getHours() + 7)).toISOString()
        };
        localStorage.setItem(`isDone${id}`, NewNote.isDone);
        localStorage.setItem(`lastChange${id}`, NewNote.lastChange);
        setRefresh(Refresh + 1);
    }

    const editNote = (id, content) => {
        const NewNote = {
            content: content,
            lastChange: new Date(new Date().setHours(new Date().getHours() + 7)).toISOString()
        };
        localStorage.setItem(`content${id}`, NewNote.content);
        localStorage.setItem(`lastChange${id}`, NewNote.lastChange);
        setRefresh(Refresh + 1);
    }

    const handleEdittingNote = (e) => {
        e.preventDefault();
    }

    const handleAddingNote = (e) => {
        e.preventDefault();
        addNote(e.target.addingnote.value);
        e.target.addingnote.value = '';
    }

    return (
        <div className='todolist-container'>
            <div className='header'>
                <h1><b>To Do List</b></h1>
            </div>

            <div className='content'>
                <Form className='add-form' onSubmit={handleAddingNote}>
                    <Form.Group controlId='addingnote' className='form-group'>
                        <Form.Control type='text' placeholder='Add note' />
                    </Form.Group>
                    <Button type='submit' className='btn'>ADD</Button>
                </Form>

                <div>
                    <Table striped bordered hover className='no-wrap align-middle table'>
                        <thead>
                            <tr>
                                <th>Index</th>
                                {/* <td>ID</td> */}
                                <th className='content-cell'>Content</th>
                                <th>Date Created</th>
                                <th>Latest Change</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {List.map((item, index) => (
                                <tr key={index} className={item.id === NewNoteId ? 'fade-in' : ''}>
                                    <td>{index + 1}</td>
                                    {/* <td>{item.id}</td> */}
                                    <td>
                                        <Form className='edit-form' onSubmit={handleEdittingNote}>
                                            <Form.Group controlId='edittingcheckbox' className='form-group formcheckbox'>
                                                <Form.Check type='checkbox' checked={item.isDone === 'Done'} onChange={(e) => editCheckBox(item.id, e.target.checked)} />
                                            </Form.Group>
                                            <Form.Group controlId='edittingnote' className='form-group forminput'>
                                                <Form.Control type='text' placeholder='...' value={item.content ? item.content : ''} onChange={(e) => editNote(item.id, e.target.value)}
                                                    style={{ color: item.isDone === 'Done' && '#cccccc' }} />
                                            </Form.Group>
                                        </Form>
                                    </td>
                                    <td>
                                        <div>{item.dateCreate?.substring(0, 10)}</div>
                                        <div>{item.dateCreate?.substring(11, 19)}</div>
                                    </td>
                                    <td>
                                        <div>{item.lastChange?.substring(0, 10)}</div>
                                        <div>{item.lastChange?.substring(11, 19)}</div>
                                    </td>
                                    <td>
                                        <div className='active-button'>
                                            <Button className='btn' onClick={() => deleteNote(item.id)}>DELETE</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {List.length === 0 &&
                                <tr>
                                    <td>NONE</td>
                                    <td>NONE</td>
                                    <td>NONE</td>
                                    <td>NONE</td>
                                    <td>NONE</td>
                                </tr>}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
