import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample } from '../../assets/listJapanese';

export default function JapaneseKanji() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const [searchQueryKanji, setSearchQueryKanji] = useState(query);

    const filteredKanji = Kanji.filter((kanji) =>
        // kanji.Id.toLowerCase().includes(searchQueryKanji.toLowerCase())
        Object.values(kanji).some(value => value.toLowerCase().includes(searchQueryKanji.toLowerCase()))
    );

    useEffect(() => {
        setSearchParams({ search: searchQueryKanji });
    }, [searchQueryKanji, setSearchParams]);

    const clearInput = () => {
        setSearchQueryKanji('');
        document.getElementById('searchkanji').focus();
    }

    return (
        <div className='japanese-kanji-container'>
            <div className='japanese-kanji-header'>
                <h2><b>Japanese Kanji</b></h2>
            </div>

            <div className='p-5 max-w-md mx-auto'>
                <Form>
                    <Form.Group controlId='searchkanji' className='form-group'>
                        <Form.Control
                            type='text'
                            placeholder='Enter Kanji...'
                            // className='w-full p-2 border rounded-md'
                            value={searchQueryKanji}
                            onChange={(e) => setSearchQueryKanji(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </Form>
            </div>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <Col key={index} sm={4} md={4} lg={3} xl={3} xxl={2} className='japanese-col'>
                            <div className='grid-card kanji-card'>
                                <div className='card-body'
                                    style={{
                                        color: (
                                            kanji.SinoVietnamese === 'NoKanji' ||
                                            kanji.On === 'NoKanji' ||
                                            kanji.Kun === 'NoKanji'
                                        ) ? 'red' : 'black'
                                    }}
                                >
                                    <h1><>{kanji.Id}</></h1>
                                    <h3>{kanji.SinoVietnamese}</h3>
                                    <p><b>On: </b>{kanji.On}</p>
                                    <p><b>Kun: </b>{kanji.Kun}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='japanese-table-content'>
                {/* <h2>Kanji</h2>
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
                </Table> */}

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
                                <td
                                    style={{
                                        color: (
                                            example.Word === 'NoKanjiExample' ||
                                            example.Hiragana === 'NoKanjiExample' ||
                                            example.Meaning === 'NoKanjiExample'
                                        ) ? 'red' : 'black'
                                    }}
                                >{example.Meaning}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
