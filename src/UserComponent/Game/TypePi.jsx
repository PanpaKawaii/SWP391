import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './TypePi.css';

export default function TypePi() {

    const handleEditingMaze = (e) => {
        e.preventDefault();
    }

    return (
        <div className='generatemaze-container'>
            <div className='header'>
                <h1><b>Type Pi</b></h1>
            </div>

            <div className='generatemaze-content'>

                
            </div>

            
        </div>
    )
}
