import React, { useState, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample, Verb } from '../../assets/listJapanese';

export default function JapaneseKanji() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const Group = searchParams.get("Group") || "";
    const [searchQueryKanji, setSearchQueryKanji] = useState(query);
    const [searchQueryVerb, setSearchQueryVerb] = useState(query);

    const filteredKanji = Kanji.filter((kanji) =>
        kanji.Id.toLowerCase().includes(searchQueryKanji.toLowerCase())
    );

    let filteredVerb = Verb.filter((verb) =>
        verb.Verb.toLowerCase().includes(searchQueryVerb.toLowerCase())
    );
    if (Group) {
        filteredVerb = filteredVerb.filter((verb) => verb.Group === Group);
    }

    useEffect(() => {
        setSearchParams({ q: searchQueryKanji });
    }, [searchQueryKanji, setSearchParams]);

    useEffect(() => {
        setSearchParams({ q: searchQueryVerb, Group });
    }, [searchQueryVerb, Group, setSearchQueryVerb]);

    console.log('Re-render');


    return (
        <div className='japanese-container'>
            <div className='header'>
                <h1><b>Japanese</b></h1>
            </div>

            <div className="p-5 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-3">🔍 Search Kanji</h2>
                <input
                    type="text"
                    placeholder="Enter Kanji..."
                    className="w-full p-2 border rounded-md"
                    value={searchQueryKanji}
                    onChange={(e) => setSearchQueryKanji(e.target.value)}
                />
            </div>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <Col key={index} sm={4} md={4} lg={3} xl={3} xxl={2} className='japanese-col'>
                            <div className='grid-card kanji-card'>
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

            <div className="p-5 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-3">🔍 Search Verb</h2>
                <input
                    type="text"
                    placeholder="Enter Verb..."
                    className="w-full p-2 border rounded-md"
                    value={searchQueryVerb}
                    onChange={(e) => setSearchQueryVerb(e.target.value)}
                />
            </div>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredVerb.filter(verb => verb.Verb !== 'NoVerb').map((verb, index) => (
                        <Col key={index} sm={6} md={6} lg={4} xl={3} xxl={3} className='japanese-col'>
                            <div className='grid-card verb-card'>
                                <div className='card-body'>
                                    <h3><b>{verb.Verb}</b></h3>
                                    <p>Group: {verb.Group}</p>
                                    <p>Meaning: {verb.Meaning}</p>
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

                {/* <h2>Kanji Example</h2>
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
                </Table> */}
            </div>
        </div>
    )
}
