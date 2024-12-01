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

    // const [HasWon, setHasWon] = useState(0);
    // const [GuessedTime, setGuessedTime] = useState(-1);
    const [GuessedCount, setGuessedCount] = useState(0);
    const [GuessedPassword, setGuessedPassword] = useState(Array(10).fill(0).map(() => ({
        index: 0,
        value: '',
        correctNumber: 0,
        correctPosition: 0
    })));

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
        return true
    }

    const checkCorrectNumber = (InputPassword) => {

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
        return CorrectNumber;
    }

    const checkCorrectPosition = (InputPassword) => {

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
        return CorrectPosition;
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
                <h1><b>Password: {Password}</b></h1>
            </div>

            <div>{Error && Error}</div>

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
                        <tr>
                            <td>
                                {GuessedPassword.length}
                            </td>
                        </tr>
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
