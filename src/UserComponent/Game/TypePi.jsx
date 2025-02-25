import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './TypePi.css';

export default function TypePi() {

    var Pi = '3,14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028';
    const [YourPi, setYourPi] = useState('');

    const PiLength = YourPi.split('').filter(char => !isNaN(char) && char !== '\n').length;

    const handleEnterPi = (e) => {
        e.preventDefault();
    }

    return (
        <div className='typepi-container'>
            <div className='header'>
                <h1><b>Type Pi</b></h1>
                <h2><b>Length:
                    {
                        Pi.substring(0, YourPi.length).includes(YourPi) ?
                            <span> {PiLength}</span>
                            :
                            <span> 0</span>
                    }
                </b></h2>

                <h2><b><span style={{ color: Pi.substring(0, YourPi.length).includes(YourPi) ? '#28a745' : '#dc3545', wordWrap: 'break-all' }}>
                    {YourPi.split('').map((char, index) => (
                        <span key={index}>{char}{(index % 20 === 19) ? <br /> : ''}</span>
                    ))}
                </span></b></h2>
            </div>

            <Form onSubmit={handleEnterPi}>
                <Form.Group controlId='yourpi' className='form-group'>
                    <Form.Control as='textarea' value={YourPi} placeholder='Write your Pi' onChange={(e) => setYourPi(e.target.value)} />
                </Form.Group>
            </Form>
        </div>
    )
}
