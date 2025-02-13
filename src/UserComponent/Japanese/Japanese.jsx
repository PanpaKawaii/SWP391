import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Row, Col, Card } from 'react-bootstrap';
import './Japanese.css';

import { Kanji } from '../../assets/listJapanese';
import { KanjiExample } from '../../assets/listJapanese';

export default function Japanese() {


    return (
        <div className='japanese-container'>
            <div className='header'>
                <h1><b>Japanese</b></h1>
            </div>

            <div className='japanese-content'>
                <Row className='image-row'>
                    {Kanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <Col key={index} sm={6} md={4} lg={3} xl={3} xxl={2} className='image-col'>
                            <div className='kanji-card'>
                                <div className='card-body'>
                                    <h1><>{kanji.Id}</></h1>
                                    <p>{kanji.SinoVietnamese}</p>
                                    <p>On: {kanji.On}</p>
                                    <p>Kun: {kanji.Kun}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='japanese-table-content'>
                <h2>Kanji</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Sino-Vietnamese</th>
                            <th>On</th>
                            <th>Kun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Kanji.map((kanji_array, k) => (
                            <tr key={k}>
                                <td style={{ color: kanji_array.Id == 'Unknown' && 'red' }}>{kanji_array.Id}</td>
                                <td style={{ color: kanji_array.SinoVietnamese == 'Unknown' && 'red' }}>{kanji_array.SinoVietnamese}</td>
                                <td style={{ color: kanji_array.On == 'Unknown' && 'red' }}>{kanji_array.On}</td>
                                <td style={{ color: kanji_array.Kun == 'Unknown' && 'red' }}>{kanji_array.Kun}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h2>Kanji Example</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Hiragana</th>
                            <th>Meaning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {KanjiExample.map((example, e) => (
                            <tr key={e}>
                                <td>{example.Word}</td>
                                <td>{example.Hiragana}</td>
                                <td>{example.Meaning}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
