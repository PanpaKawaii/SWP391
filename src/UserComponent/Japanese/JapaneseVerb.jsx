import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseVerb.css';

import { Verb } from '../../assets/listJapanese';

export default function JapaneseVerb() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const Group = searchParams.get('Group') || '';
    const [searchQueryVerb, setSearchQueryVerb] = useState(query);

    let filteredVerb = Verb.filter((verb) =>
        // verb.Verb.toLowerCase().includes(searchQueryVerb.toLowerCase())
        Object.values(verb).some(value => value.toLowerCase().includes(searchQueryVerb.toLowerCase()))
    );
    if (Group) {
        filteredVerb = filteredVerb.filter((verb) => verb.Group === Group);
    }

    useEffect(() => {
        setSearchParams({ search: searchQueryVerb, Group });
    }, [searchQueryVerb, Group, setSearchParams]);

    const clearInput = () => {
        setSearchQueryVerb('');
        setSearchParams({ search: '', Group: '' });
        document.getElementById('searchverb').focus();
    }

    return (
        <div className='japanese-verb-container'>
            <div className='japanese-verb-header'>
                <h2>Japanese Verb</h2>
            </div>

            <div className='p-5 max-w-md mx-auto'>
                <Form>
                    <Form.Group controlId='searchverb' className='form-group'>
                        <Form.Control
                            type='text'
                            placeholder='Enter Verb...'
                            // className='w-full p-2 border rounded-md'
                            value={searchQueryVerb}
                            onChange={(e) => setSearchQueryVerb(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='groupverb' className='form-group'>
                        <Form.Control
                            as='select'
                            value={Group}
                            onChange={(e) => setSearchParams({ search: searchQueryVerb, Group: e.target.value })}
                        >
                            <option value=''>Select Group</option>
                            <option value='I'>Group I</option>
                            <option value='II'>Group II</option>
                            <option value='III'>Group III</option>
                        </Form.Control>
                    </Form.Group>

                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </Form>
            </div>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredVerb.filter(verb => verb.Verb !== 'NoVerb').map((verb, index) => (
                        <Col key={index} sm={6} md={6} lg={4} xl={3} xxl={3} className='japanese-col'>
                            <div
                                className='grid-card verb-card'
                                style={{
                                    backgroundColor: verb.Group === 'I' ?
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
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
