import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './WhatIsThePassword.css';

export default function WhatIsThePassword() {

    const [Password, setPassword] = useState(0);
    const [Refresh, setRefresh] = useState(0);

    const handleSubmitCurrentGuess = (e) => {
        e.preventDefault();
        setCurrentGuess(e.target.guessedpassword.value);
    }

    const [GuessedCount, setGuessedCount] = useState(0);
    const [CurrentGuess, setCurrentGuess] = useState(0);
    const [GuessedPassword, setGuessedPassword] = useState(Array(11).fill(0).map(() => ({
        index: 0,
        value: 0,
        correctNumber: 0,
        correctPosition: 0
    })));

    useEffect(() => {
        const checkGuessedPassword = (CurrentGuessedPassword) => {
            console.log('checkGuessedPassword');
            if (check()) {
                const index = GuessedCount;
                const value = CurrentGuessedPassword;
                const correctNumber = 0;
                const correctPosition = 0;

                setGuessedPassword(prevState => {
                    let newState = [...prevState];
                    newState[index] = {
                        index: index,
                        value: value,
                        correctNumber: correctNumber,
                        correctPosition: correctPosition
                    };
                    return newState;
                });
                setGuessedCount(GuessedCount + 1);
            }
            console.log('checkGuessedPassword Success');
        }

        const check = () => {

            let index4 = CurrentGuess % 10;
            let index3 = (Math.floor(CurrentGuess / 10)) % 10;
            let index2 = (Math.floor(CurrentGuess / 100)) % 10;
            let index1 = (Math.floor(CurrentGuess / 1000)) % 10;

            if (
                index1 === index2 || index1 === index3 || index1 === index4 ||
                index2 === index3 || index2 === index4 ||
                index3 === index4
            ) {
                return false
            }
            return true
        }

        checkGuessedPassword(CurrentGuess);
    }, [CurrentGuess]);

    useEffect(() => {
        const generateRandomPassword = () => {
            console.log('generateRandomPassword');

            let index1 = 0;
            let index2 = 0;
            let index3 = 0;
            let index4 = 0;

            while (
                index1 === index2 || index1 === index3 || index1 === index4 ||
                index2 === index3 || index2 === index4 ||
                index3 === index4 ||
                index1 >= 10 || index2 >= 10 || index3 >= 10 || index4 >= 10
            ) {
                index1 = Math.floor(Math.random() * 10);
                index2 = Math.floor(Math.random() * 10);
                index3 = Math.floor(Math.random() * 10);
                index4 = Math.floor(Math.random() * 10);
            }

            const newPassword = index1 * 1000 + index2 * 100 + index3 * 10 + index4;

            setPassword(newPassword);
            console.log('generateRandomPassword Success');
        };

        setGuessedCount(0);
        setCurrentGuess(0)
        setGuessedPassword(Array(11).fill(0).map(() => ({
            index: 0,
            value: 0,
            correctNumber: 0,
            correctPosition: 0
        })));
        generateRandomPassword();
    }, [Refresh]);

    return (
        <div className='whatisthepassword-container'>
            <div className='header'>
                <h2><b>WHAT IS THE</b></h2>
                <h1><b>PASSWORD?</b></h1>
                <h1><b>{Password}</b></h1>
            </div>

            <Form className='change-information-form' onSubmit={handleSubmitCurrentGuess}>
                <Form.Group controlId='guessedpassword' className='form-group'>
                    <Form.Control type='text' placeholder='Enter your password' />
                </Form.Group>
                <div className='change-information-button'>
                    <Button type='submit' className='btn'>GUESS</Button>
                    <Button type='reset' className='btn btn-reset'>ĐẶT LẠI</Button>
                </div>
            </Form>

            <div className='game-content'>
                <Table className='no-wrap align-middle table'>
                    <tbody>
                        {GuessedPassword.map((guessedpassword, index) => (
                            <tr key={index}>
                                <td>
                                    <p>
                                        {index}
                                    </p>
                                    <p>
                                        {guessedpassword.index}
                                    </p>
                                    <p>
                                        {guessedpassword.value}
                                    </p>
                                    <p>
                                        {guessedpassword.correctNumber}
                                    </p>
                                    <p>
                                        {guessedpassword.correctPosition}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className='game-detail'>
                    <div>
                        <div className='support'>
                            <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET GAME</Button>
                        </div>
                    </div>
                    <div className='result-detail'>
                        Result: NOT YET
                    </div>
                </div>
            </div>
        </div>
    )
}
