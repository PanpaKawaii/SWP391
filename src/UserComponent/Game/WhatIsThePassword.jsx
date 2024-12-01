import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './WhatIsThePassword.css';

export default function WhatIsThePassword() {

    const [Password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [Refresh, setRefresh] = useState(0);

    const handleSubmitCurrentGuess = (e) => {
        e.preventDefault();
        checkInputPassword(e.target.guessedpassword.value);
        e.target.guessedpassword.value = '';
    }

    const [HasWon, setHasWon] = useState(false);
    // const [GuessedTime, setGuessedTime] = useState(-1);
    const [GuessedCount, setGuessedCount] = useState(0);
    const [GuessedPassword, setGuessedPassword] = useState(Array(10).fill(0).map(() => ({
        index: 0,
        value: '',
        correctNumber: 0,
        correctPosition: 0
    })));

    const clearInput = () => {
        setError('');
    }

    const checkInputPassword = (InputPassword) => {
        console.log('checkInputPassword');
        if (checkValidate(InputPassword)) {
            const index = GuessedCount;
            const value = InputPassword;
            const correctNumber = checkCorrectNumber(InputPassword);
            const correctPosition = checkCorrectPosition(InputPassword);

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
            checkWin(correctNumber, correctPosition);
            setGuessedCount(GuessedCount + 1);
        }
        console.log('checkInputPassword Success');
    }

    const checkValidate = (InputCheckValidate) => {

        let InputIndex4 = InputCheckValidate % 10;
        let InputIndex3 = (Math.floor(InputCheckValidate / 10)) % 10;
        let InputIndex2 = (Math.floor(InputCheckValidate / 100)) % 10;
        let InputIndex1 = (Math.floor(InputCheckValidate / 1000)) % 10;

        if (
            InputIndex1 == InputIndex2 || InputIndex1 == InputIndex3 || InputIndex1 == InputIndex4 ||
            InputIndex2 == InputIndex3 || InputIndex2 == InputIndex4 ||
            InputIndex3 == InputIndex4 ||
            InputCheckValidate.length !== 4 ||
            !/^\d+$/.test(InputCheckValidate)
        ) {
            setError('There must be 4 different digits!');
            console.log('check false');
            return false
        }
        setError('');
        console.log('check true');
        return true;
    }

    const checkCorrectNumber = (InputPassword) => {
        console.log('checkCorrectNumber');

        let RandomIndex4 = Password % 10;
        let RandomIndex3 = (Math.floor(Password / 10)) % 10;
        let RandomIndex2 = (Math.floor(Password / 100)) % 10;
        let RandomIndex1 = (Math.floor(Password / 1000)) % 10;

        let InputIndex4 = InputPassword % 10;
        let InputIndex3 = (Math.floor(InputPassword / 10)) % 10;
        let InputIndex2 = (Math.floor(InputPassword / 100)) % 10;
        let InputIndex1 = (Math.floor(InputPassword / 1000)) % 10;

        let Check = 0;
        let CorrectNumber = 0;
        for (let i = 1; i <= 4; i++) {
            if (i == 1) Check = InputIndex1;
            if (i == 2) Check = InputIndex2;
            if (i == 3) Check = InputIndex3;
            if (i == 4) Check = InputIndex4;
            if (Check == RandomIndex1 || Check == RandomIndex2 || Check == RandomIndex3 || Check == RandomIndex4) {
                CorrectNumber++;
            }
        }
        console.log('checkCorrectNumber Success');
        return CorrectNumber;
    }

    const checkCorrectPosition = (InputPassword) => {
        console.log('checkCorrectPosition');

        let RandomIndex4 = Password % 10;
        let RandomIndex3 = (Math.floor(Password / 10)) % 10;
        let RandomIndex2 = (Math.floor(Password / 100)) % 10;
        let RandomIndex1 = (Math.floor(Password / 1000)) % 10;

        let InputIndex4 = InputPassword % 10;
        let InputIndex3 = (Math.floor(InputPassword / 10)) % 10;
        let InputIndex2 = (Math.floor(InputPassword / 100)) % 10;
        let InputIndex1 = (Math.floor(InputPassword / 1000)) % 10;

        let CorrectPosition = 0;
        if (InputIndex1 == RandomIndex1) CorrectPosition++;
        if (InputIndex2 == RandomIndex2) CorrectPosition++;
        if (InputIndex3 == RandomIndex3) CorrectPosition++;
        if (InputIndex4 == RandomIndex4) CorrectPosition++;
        console.log('checkCorrectPosition Success');
        return CorrectPosition;
    }

    const checkWin = (correctNumber, correctPosition) => {
        if (correctNumber === 4 && correctPosition === 4 && GuessedCount <= 10) {
            console.log('You have won the game!');
            setHasWon(true);
        }
        return;
    }

    useEffect(() => {
        const generateRandomPassword = () => {
            console.log('generateRandomPassword');

            let RandomIndex1 = 0;
            let RandomIndex2 = 0;
            let RandomIndex3 = 0;
            let RandomIndex4 = 0;

            while (
                RandomIndex1 == RandomIndex2 || RandomIndex1 == RandomIndex3 || RandomIndex1 == RandomIndex4 ||
                RandomIndex2 == RandomIndex3 || RandomIndex2 == RandomIndex4 ||
                RandomIndex3 == RandomIndex4 ||
                RandomIndex1 >= 10 || RandomIndex2 >= 10 || RandomIndex3 >= 10 || RandomIndex4 >= 10
            ) {
                RandomIndex1 = Math.floor(Math.random() * 10);
                RandomIndex2 = Math.floor(Math.random() * 10);
                RandomIndex3 = Math.floor(Math.random() * 10);
                RandomIndex4 = Math.floor(Math.random() * 10);
            }

            const newPassword = RandomIndex1.toString() + RandomIndex2.toString() + RandomIndex3.toString() + RandomIndex4.toString();

            setPassword(newPassword.toString());
            console.log('generateRandomPassword Success');
        };

        setError('');
        setHasWon(false);
        setGuessedCount(0);
        setGuessedPassword(Array(10).fill(0).map(() => ({
            index: 0,
            value: '',
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
                {/* <h1><b>Password: {Password}</b></h1> */}
            </div>

            <Form className='change-information-form' onSubmit={handleSubmitCurrentGuess}>
                <Form.Group controlId='guessedpassword' className='form-group'>
                    <Form.Control type='text' placeholder='Enter password' />
                </Form.Group>
                <div className='change-information-button'>
                    <Button type='submit' className='btn'>ENTER</Button>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </div>
            </Form>

            <div className='error-message'>{Error && Error}</div>

            <div className='game-content'>
                <Table className='no-wrap align-middle table'>
                    <thead className='list-header'>
                        <tr>
                            <th>Index</th>
                            <th>Entered Password</th>
                            <th>Correct Number</th>
                            <th>Correct Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>
                                {GuessedPassword.length}
                            </td>
                        </tr> */}
                        {GuessedPassword
                            .filter(guessedpassword => guessedpassword.value != '')
                            .sort((b, a) => a.index - b.index)
                            .map((guessedpassword, index) => (
                                <tr key={index}>
                                    <td>
                                        {guessedpassword.index + 1}
                                    </td>
                                    <td>
                                        {guessedpassword.value}
                                    </td>
                                    <td>
                                        {guessedpassword.correctNumber}
                                    </td>
                                    <td>
                                        {guessedpassword.correctPosition}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='game-detail'>
                <div>
                    <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESET GAME</Button>
                </div>
                <div className='result-detail'>
                    {HasWon === true && <h2 style={{ color: '#28a745' }}><b>YOU WON!</b></h2>}
                    {HasWon === false && GuessedCount >= 10 && <h2 style={{ color: '#dc3545' }}><b>YOU LOST!</b></h2>}
                </div>
            </div>
        </div>
    )
}
