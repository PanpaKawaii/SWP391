import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseVerb.css';

import { Verb } from './listJapanese';

export default function JapaneseVerb() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const group = searchParams.get('group') || '';
    const [searchQueryVerb, setSearchQueryVerb] = useState(query);

    let filteredVerb = Verb.filter((verb) =>
        // verb.Verb.toLowerCase().includes(searchQueryVerb.toLowerCase())
        Object.values(verb).some(value => value.toLowerCase().includes(searchQueryVerb.toLowerCase()))
    );

    if (group) {
        filteredVerb = filteredVerb.filter((verb) => verb.Group === group);
    }

    useEffect(() => {
        setSearchParams({ search: searchQueryVerb, group });
    }, [searchQueryVerb, group, setSearchParams]);

    const clearInput = () => {
        setSearchQueryVerb('');
        setSearchParams({ search: '', group: '' });
        document.getElementById('searchverb').focus();
    }

    const handleEnterVerb = (e) => {
        e.preventDefault();
    }

    return (
        <div className='japanese-verb-container'>
            <div className='header'>
                <h2><b>Japanese Verb</b></h2>
            </div>

            <Form onSubmit={handleEnterVerb}>
                <Form.Group controlId='searchverb' className='form-group searchverb'>
                    <Form.Control
                        type='text'
                        placeholder='いきます、III、Đi、...'
                        value={searchQueryVerb}
                        onChange={(e) => setSearchQueryVerb(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='groupverb' className='form-group groupverb'>
                    <Form.Control
                        as='select'
                        value={group}
                        onChange={(e) => setSearchParams({ search: searchQueryVerb, group: e.target.value })}
                    >
                        <option value=''>Select Group</option>
                        <option value='I'>Group I</option>
                        <option value='II'>Group II</option>
                        <option value='III'>Group III</option>
                    </Form.Control>
                </Form.Group>

                <div className='active-button'>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </div>
            </Form>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredVerb.filter(verb => verb.Verb !== 'NoVerb').map((verb, index) => (
                        <Col key={index} xs={6} sm={6} md={6} lg={4} xl={3} xxl={3} className='japanese-col'>
                            <div
                                className='grid-card'
                                style={{
                                    backgroundColor:
                                        verb.Group === 'I' ?
                                            '#fdd9e5'
                                            :
                                            (verb.Group === 'II' ?
                                                '#f99dbc'
                                                :
                                                '#f86aa1'
                                            )
                                }}
                            >
                                <div className='card-body'>
                                    <h3 className='japanese-font'>{verb.Verb}</h3>
                                    <p>Group: {verb.Group}</p>
                                    <p>Meaning: {verb.Meaning}</p>
                                    <p className='japanese-font'>Romaji: {verb.Romaji}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
