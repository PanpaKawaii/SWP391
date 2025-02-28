import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample } from './listJapanese';

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
        setSearchParams({ search: '' });
        document.getElementById('searchkanji').focus();
    }



    const rotateCard = (index) => {
        const card = document.getElementById(`poker-card-${index}`);
        card.classList.toggle('rotate');
    }

    const closeAll = () => {
        const cards = document.getElementsByClassName('card-body');
        Array.from(cards).forEach(card => card.classList.add('rotate'));
    }

    const openAll = () => {
        const cards = document.getElementsByClassName('card-body');
        Array.from(cards).forEach(card => card.classList.remove('rotate'));
    }

    const handleEnterKanji = (e) => {
        e.preventDefault();
    }

    return (
        <div className='japanese-kanji-container'>
            <div className='header'>
                <h2><b>Japanese Kanji</b></h2>
            </div>

            <Form onSubmit={handleEnterKanji}>
                <Form.Group controlId='searchkanji' className='form-group'>
                    <Form.Control
                        type='text'
                        placeholder='日、ニチ、ひ、nichi、NHẬT、...'
                        value={searchQueryKanji}
                        onChange={(e) => setSearchQueryKanji(e.target.value)}
                    />
                </Form.Group>

                <div className='active-button'>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                    <Button className='btn' onClick={closeAll}>CLOSE ALL</Button>
                    <Button className='btn' onClick={openAll}>OPEN ALL</Button>
                </div>
            </Form>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <Col key={kanji.Id} xs={6} sm={6} md={4} lg={3} xl={3} xxl={2} className='japanese-col'>
                            <div className='grid-card'>
                                <div
                                    id={`poker-card-${index}`}
                                    onClick={() => rotateCard(index)}
                                    className='card-body'
                                    style={{
                                        color: (
                                            kanji.SinoVietnamese === 'NoKanji' ||
                                            kanji.On === 'NoKanji' ||
                                            kanji.Kun === 'NoKanji' ||
                                            kanji.Romaji === 'NoKanji' ||
                                            !kanji.Romaji
                                        ) ? 'red' : 'black'
                                    }}
                                >
                                    <div className='face front'>
                                        <h1 className='japanese-font'><>{kanji.Id}</></h1>
                                        <h4>{kanji.SinoVietnamese}</h4>
                                        <p className='japanese-font'>On: {kanji.On}</p>
                                        <p className='japanese-font'>Kun: {kanji.Kun}</p>
                                        <p className='japanese-font'>Romaji: {kanji.Romaji}</p>
                                    </div>

                                    <div className='face back'>
                                        <h3>{kanji.SinoVietnamese}</h3>
                                        {KanjiExample.filter(include => include.Word.includes(kanji.Id)).map((example, index) => (
                                            <div key={index}>
                                                <span className='japanese-font'>{example.Hiragana}</span> - <span>{example.Meaning}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='japanese-table-content'>
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
                        {KanjiExample.filter(kanji => kanji.Word !== 'NoKanjiExample').map((example, e) => (
                            <tr key={e}>
                                <td>{example.Word}</td>
                                <td>{example.Hiragana}</td>
                                <td
                                    style={{
                                        color: (
                                            example.Word === 'NoKanjiExample' ||
                                            example.Hiragana === 'NoKanjiExample' ||
                                            example.Meaning === 'NoKanjiExample' ||
                                            example.Romaji === 'NoKanji' ||
                                            !example.Romaji
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
