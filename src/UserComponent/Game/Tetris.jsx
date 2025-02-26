import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './Tetris.css';
export default function Tetris() {


    // const [GameBoard, setGameBoard] = useState(Array(20).fill(0).map(() => Array(10).fill(0)));
    const [GameBoard, setGameBoard] = useState(Array(21).fill(0).map((_, index) => index === 20 ? Array(10).fill(9) : Array(10).fill(0)));
    // const [FallingObject, setFallingObject] = useState(Array(24).fill(0).map(() => Array(10).fill(0)));


    const ColorCheck = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 3, 4, 5, 6, 7, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectL1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectL2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectZ1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectZ2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 4, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectT = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectO = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const ObjectI = [
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    const [FallingObject, setFallingObject] = useState(ObjectL1);
    var VarFallingObject = ObjectL1;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                ClickRight();
            } else if (e.key === 'ArrowLeft') {
                ClickLeft();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const ClickLeft = () => {
        console.log('Go to left');

        //Kiểm tra va chạm khối có sẵn
        // for (let row = 0; row < FallingObject.length; row++) {
        //     for (let col = 1; col < FallingObject[row].length - 1; col++) {
        //         if (FallingObject[row][col] !== 0 && GameBoard[row][col - 1] !== 0) {
        //             return;
        //         }
        //     }
        // }

        //Kiểm tra va chạm tường hai bên
        for (let row = 0; row < FallingObject.length; row++) {
            if (FallingObject[row][0] !== 0) {
                return;
            }
        }

        let NewFallingObject = FallingObject.map(row => row.map((cell, index) => (index >= 0 && row[index + 1] != null) ? row[index + 1] : 0));
        setFallingObject(NewFallingObject);
        VarFallingObject = NewFallingObject;

        console.log('Go to left success');
    }

    const ClickRight = () => {
        console.log('Go to right');

        //Kiểm tra va chạm khối có sẵn
        // for (let row = 0; row < FallingObject.length; row++) {
        //     for (let col = 1; col < FallingObject[row].length - 1; col++) {
        //         if (FallingObject[row][col] !== 0 && GameBoard[row][col + 1] !== 0) {
        //             return;
        //         }
        //     }
        // }

        //Kiểm tra va chạm tường hai bên
        for (let row = 0; row < FallingObject.length; row++) {
            if (FallingObject[row][FallingObject[row].length - 1] !== 0) {
                return;
            }
        }

        let NewFallingObject = FallingObject.map(row => row.map((cell, index) => (index < row.length && row[index - 1] != null) ? row[index - 1] : 0));
        setFallingObject(NewFallingObject);
        VarFallingObject = NewFallingObject;

        console.log('Go to right success');
    }

    const ClickDown = () => {
        console.log('Go down');

        let RowHeight = 0;
        let ColumnContainer = []
        for (let row = 0; row < FallingObject.length; row++) {
            for (let col = 0; col < FallingObject[row].length; col++) {
                if (FallingObject[row][col] !== 0) {
                    ColumnContainer = [...ColumnContainer, [col]];
                    console.log('ColumnContainer', ColumnContainer);
                }
            }
            if (FallingObject[row].some(col => col !== 0)) {
                RowHeight += 1;
                console.log('RowHeight', RowHeight);
            }
        }



        for (let row = GameBoard.length - 1; row >= 0; row--) {
            for (let x = 0; x < ColumnContainer.length; x++) {
                if (FallingObject[row][col] !== 0) {
                    ColumnContainer = [...ColumnContainer, [col]];
                    console.log('ColumnContainer', ColumnContainer);
                }
            }
            if (FallingObject[row].some(col => col !== 0)) {
                RowHeight += 1;
                console.log('RowHeight', RowHeight);
            }
        }

        let LastRow;
        for (let row = 0; row < GameBoard.length; row++) {
            for (let col = 0; col < GameBoard[row].length; col++) {
                if (GameBoard[row][col] !== 0) {
                    LastRow = row;
                }
            }
        }

        let NewFallingObject = FallingObject.map(row => row.map((cell, index) => (index < row.length && row[index - 1] != null) ? row[index - 1] : 0));
        setFallingObject(NewFallingObject);
        VarFallingObject = NewFallingObject;

        console.log('Go down success');
    }

    const [Time, setTime] = useState(-1);
    useEffect(() => {
        let Interval;
        Interval = setInterval(() => {
            setTime(Time + 1);
        }, 200);
        return () => clearInterval(Interval);
    }, [Time]);

    useEffect(() => {
        for (let row = 3; row < FallingObject.length; row++) {
            for (let col = 0; col < FallingObject[row].length; col++) {
                if (FallingObject[row][col] !== 0 && GameBoard[row - 3][col] !== 0) {
                    console.log('Meet the end');
                    let NewGameBoard = [...GameBoard];
                    for (let row = 4; row < FallingObject.length; row++) {
                        for (let col = 0; col < FallingObject[row].length; col++) {
                            if (FallingObject[row][col] !== 0) {
                                NewGameBoard[row - 4][col] = 9;
                                setGameBoard(NewGameBoard);
                            }
                        }
                    }
                    const RandomObject = [ObjectL1, ObjectL2, ObjectZ1, ObjectZ2, ObjectT, ObjectO, ObjectI][Math.floor(Math.random() * 7)]
                    setFallingObject(RandomObject);
                    return;
                }
            }
        }

        let NewFallingObject = FallingObject.map((row, rowIndex) =>
            row.map((cell, index) =>
                (rowIndex > 0 && rowIndex < FallingObject.length) ? FallingObject[rowIndex - 1][index] : 0
            )
        );

        VarFallingObject = NewFallingObject;
        setFallingObject(NewFallingObject);
        console.log('Interval executed');
    }, [Time]);

    const changeFallingObject = (NewFallingObject) => {
        console.log('New Falling Object ===========', NewFallingObject);
        setFallingObject(NewFallingObject);
        console.log('FallingObject ===========', FallingObject);
        VarFallingObject = NewFallingObject;
    }

    return (
        <div className='tetris-container'>
            <div className='header'>
                <h1><b>Tetris {Time}</b></h1>
            </div>

            <div className='content'>
                <Table bordered
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody>
                        {GameBoard.slice(0, -1).map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            backgroundColor: FallingObject[index_row + 4][index_col] === 1 ?
                                                '#fb8b24'
                                                :
                                                (FallingObject[index_row + 4][index_col] === 2 ?
                                                    '#215ff0'
                                                    :
                                                    (FallingObject[index_row + 4][index_col] === 3 ?
                                                        '#dc3545'
                                                        :
                                                        (FallingObject[index_row + 4][index_col] === 4 ?
                                                            '#28a745'
                                                            :
                                                            (FallingObject[index_row + 4][index_col] === 5 ?
                                                                '#6f42c1'
                                                                :
                                                                (FallingObject[index_row + 4][index_col] === 6 ?
                                                                    '#ffc107'
                                                                    :
                                                                    (FallingObject[index_row + 4][index_col] === 7 ?
                                                                        '#64afff'
                                                                        :
                                                                        (GameBoard[index_row][index_col] === 9 ?
                                                                            'lime'
                                                                            :
                                                                            '#064415'
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                        }}
                                    >
                                        {/* <p>{Maze[index_row][index_col]}</p> */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* <div className='game-detail'>
                    {[ColorCheck, ObjectL1, ObjectL2, ObjectZ1, ObjectZ2, ObjectT, ObjectO, ObjectI].map((object, index) => (
                        <Button key={index} onClick={() => changeFallingObject(object)}>{`Object${index}`}</Button>
                    ))}
                </div> */}

                <div className='control-button'>
                    <Button className='btn' onClick={() => ClickRight()}><i className='fa-solid fa-arrow-up'></i></Button>
                    <div className='left-right'>
                        <Button className='btn' onClick={() => ClickLeft()}><i className='fa-solid fa-arrow-left'></i></Button>
                        <Button className='btn' onClick={() => ClickRight()}><i className='fa-solid fa-arrow-right'></i></Button>
                    </div>
                    <Button className='btn' onClick={() => ClickDown()}><i className='fa-solid fa-arrow-down'></i></Button>
                </div>

                {/* <pre>{JSON.stringify(FallingObject, null, 0).replace(/,\n/g, ',').replace(/],/g, '],\n')}</pre> */}

            </div>
        </div>
    )
}
