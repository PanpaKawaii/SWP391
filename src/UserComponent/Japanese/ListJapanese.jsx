import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './ListJapanese.css';

import Kanji from '../../assets/imageJAPANESE/Kanji.png';
import Verb from '../../assets/imageJAPANESE/Verb.png';

export default function ListJapanese() {

    const ListJapanese = [
        { name: 'Kanji', src: Kanji, link: '/japanese/kanji' },
        { name: 'Verb', src: Verb, link: '/japanese/verb' },
    ];

    return (
        <div className='listjapanese-container'>
            <div className='header'>
                <h1><b>List Japanese</b></h1>
            </div>
            <div className='content'>
                <Row className='image-row'>
                    {ListJapanese.map((japanese, index) => (
                        <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3} xxl={2} className='image-col'>
                            <Link to={`${japanese.link}`}>
                                <Card className='image-card'>
                                    <Card.Body className='card-body'>
                                        <img src={japanese.src} alt={japanese.name} />
                                        <h4><b>{japanese.name}</b></h4>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            <hr />
            <Outlet />
        </div>
    )
}
