import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './ToDoList.css';

export default function ToDoList() {
    const [Refresh, setRefresh] = useState(0);
    const [newNoteId, setNewNoteId] = useState(null);
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

    const AddNote = (content) => {
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
        localStorage.setItem(`isDone${maxId + 1}`, newNote.isDone);
        localStorage.setItem(`content${maxId + 1}`, newNote.content);
        localStorage.setItem(`dateCreate${maxId + 1}`, newNote.dateCreate);
        localStorage.setItem(`lastChange${maxId + 1}`, newNote.lastChange);
        setNewNoteId(newNote.id);
        setList(prevList => [...prevList, newNote]);
        setRefresh(Refresh + 1);
    }

    const DeleteNote = (id) => {
        localStorage.removeItem(`isDone${id}`);
        localStorage.removeItem(`content${id}`);
        localStorage.removeItem(`dateCreate${id}`);
        localStorage.removeItem(`lastChange${id}`);
        setRefresh(Refresh + 1);
    }

    const EditCheckBox = (id, checked) => {
        const newNote = {
            isDone: checked === true ? 'Done' : 'NotDone',
            lastChange: new Date().toISOString()
        };
        localStorage.setItem(`isDone${id}`, newNote.isDone);
        localStorage.setItem(`lastChange${id}`, newNote.lastChange);
        setRefresh(Refresh + 1);
    }

    const EditNote = (id, content) => {
        const newNote = {
            content: content,
            lastChange: new Date().toISOString()
        };
        localStorage.setItem(`content${id}`, newNote.content);
        localStorage.setItem(`lastChange${id}`, newNote.lastChange);
        setRefresh(Refresh + 1);
    }

    const handleEdittingNote = (e) => {
        e.preventDefault();
    }

    const handleAddingNote = (e) => {
        e.preventDefault();
        AddNote(e.target.addingnote.value);
        e.target.addingnote.value = '';
    }

    return (
        <div className='todolist-container'>
            <div className='header'>
                <h1><b>To Do List</b></h1>
            </div>

            <div className='todolist-content'>
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
                                <tr key={index} className={item.id === newNoteId ? 'fade-in' : ''}>
                                    <td>{index + 1}</td>
                                    {/* <td>{item.id}</td> */}
                                    <td>
                                        <Form className='edit-form' onSubmit={handleEdittingNote}>
                                            <Form.Group controlId='edittingcheckbox' className='form-group formcheckbox'>
                                                <Form.Check type='checkbox' checked={item.isDone === 'Done'} onChange={(e) => EditCheckBox(item.id, e.target.checked)} />
                                            </Form.Group>
                                            <Form.Group controlId='edittingnote' className='form-group forminput'>
                                                <Form.Control type='text' placeholder='...' value={item.content} onChange={(e) => EditNote(item.id, e.target.value)}
                                                    style={{ color: item.isDone === 'Done' && '#cccccc' }} />
                                            </Form.Group>
                                        </Form>
                                    </td>
                                    <td>{item.dateCreate}</td>
                                    <td>{item.lastChange}</td>
                                    <td>
                                        <Button className='btn' onClick={() => DeleteNote(item.id)}>DELETE</Button>
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
