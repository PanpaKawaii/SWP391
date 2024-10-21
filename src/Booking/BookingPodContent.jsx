import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './BookingPodContent.css';

import { imagePODs } from '../assets/listPODs';

export default function BookingPodContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Những lựa chọn trên thanh tìm kiếm
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedPod, setSelectedPod] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedUtility, setSelectedUtility] = useState('');
    const [podName, setPodName] = useState('');

    // Lấy Utility được chọn
    const filteredUtilities = UTILITIes ? UTILITIes.filter(utility =>
        utility.id.toString() === selectedUtility.toString() || !selectedUtility.toString()
    ) : [];

    // Lấy Pods của Utility được chọn
    const Pods = (filteredUtilities && filteredUtilities.length > 0) ? filteredUtilities[0].pods : [];

    // Create a new array uniquePodName with unique pod names
    const [uniquePodName, setUniquePodName] = useState([]);

    useEffect(() => {
        if (PODs) {
            const uniquePods = PODs.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setUniquePodName(uniquePods);
        }
    }, [PODs]);

    //Lấy Pods trùng khớp với những lựa chọn trên thanh tìm kiếm
    const filteredResults = Pods ? Pods.filter(pod =>
        (pod.storeId == selectedStore || !selectedStore) &&
        (pod.name === selectedPod || !selectedPod) &&
        (pod.typeId.toString() === selectedType.toString() || !selectedType.toString()) &&
        pod.name.toLowerCase().includes(podName.toLowerCase())
    ) : [];

    const getCapacity = (typeId) => {
        const type = TYPEs ? TYPEs.find(type => type.id === typeId) : null;
        return type ? type.capacity : 0;
    };

    const getTypeName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const type = TYPEs ? TYPEs.find(type => type.id === pod.typeId) : null;
        return type ? type.name : null;
    };

    const getUtility = (podId) => {
        const utility = UTILITIes ? UTILITIes.filter(utility =>
            utility.pods && utility.pods.some(pod => pod.id === podId)
        ) : [];
        return utility;
    };

    const getSlots = (bookingId) => {
        const slots = SLOTs ? SLOTs.filter(slot =>
            slot.bookings && slot.bookings.some(booking => booking.id === bookingId)
        ) : [];
        return slots;
    };

    const getStoreName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.name : null;
    };

    const getStoreAddress = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.address : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedStore, selectedPod, selectedType, selectedUtility, podName });
    };

    return (
        <div className='POD-booking-pod'>

            <div className='search-container'>

                <Form className='search' onSubmit={handleSubmit}>

                    <Form.Group controlId='formStore' className='form-group'>
                        <Form.Control as='select' value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                            <option value=''>[ Store]</option>
                            {STOREs && STOREs.map(store => (
                                <option key={store.id} value={store.id}>{store.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formPod' className='form-group'>
                        <Form.Control as='select' value={selectedPod} onChange={(e) => setSelectedPod(e.target.value)}>
                            <option value=''>[ POD ]</option>
                            {uniquePodName && uniquePodName.map(pod => (
                                <option key={pod.id} value={pod.name}>{pod.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value=''>[ Type ]</option>
                            {TYPEs && TYPEs.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select' value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
                            <option value=''>[ Utility ]</option>
                            {UTILITIes && UTILITIes.map(utility => (
                                <option key={utility.id} value={utility.id}>{utility.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='POD Name' value={podName} onChange={(e) => setPodName(e.target.value)} />
                    </Form.Group>

                </Form>

            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle table border-bottom'>
                    <thead className='list-header'>
                        <tr>
                            <th className='list-id' style={{ backgroundColor: '#f5f5f5' }}>ID</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Image</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Name</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Type</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Store</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Utility</th>
                            <th style={{ backgroundColor: '#f5f5f5' }}>Detail</th>
                        </tr>
                    </thead>
                    <tbody className='list-body'>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((pod) => (
                                <tr key={pod.id} className='border-bottom list-item'>
                                    <td className='list-id'>{pod.id}</td>
                                    <td>
                                        <img src={imagePODs.find(image => image.id === pod.id)?.image} alt='image' />
                                    </td>
                                    <td>
                                        <h3><b>{pod.name}</b></h3>
                                        {[...Array(pod.rating)].map((_, i) => (
                                            <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                        ))}
                                    </td>
                                    <td>
                                        {getTypeName(pod.id)}
                                        <br />
                                        {getCapacity(pod.typeId) === 10 ?
                                            (
                                                <span style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                            ) :
                                            (
                                                [...Array(getCapacity(pod.typeId))].map((_, i) => (
                                                    <span key={i} style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                                ))
                                            )
                                        }
                                    </td>
                                    <td>
                                        {getStoreName(pod.id)}
                                        <br />
                                        {getStoreAddress(pod.id)}
                                    </td>
                                    <td>
                                        {getUtility(pod.id).map((util, index) => (
                                            <li key={index}>{util.name}</li>
                                        ))}
                                    </td>
                                    <td>
                                        <Link to={`${pod.id}`}>
                                            <Button className='btn' >Detail</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No PODs available.</td></tr>
                        )}
                    </tbody>
                </table>

                {/* <Row className='image-row'>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((pod) => (
                            <Col key={pod.id} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className='image-col'>
                                <Card className='image-card'>
                                    <img src={pod.image} alt={pod.name} />
                                    <div className='rating'>
                                        {[...Array(pod.rating)].map((_, i) => (
                                            <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                        ))}
                                    </div>

                                    <div className='capacity'>
                                        {getCapacity(pod.typeId) === 10 ?
                                            (
                                                <span className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                            ) :
                                            (
                                                [...Array(getCapacity(pod.typeId))].map((_, i) => (
                                                    <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                                ))
                                            )
                                        }
                                    </div>

                                    <Card.Body className='card-body'>
                                        <h5><b>{pod.name}</b></h5>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>TypeId: {pod.typeId}</p>
                                                <p>StoreId: {pod.storeId}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`${pod.id}`}>
                                                    <Button className='btn' style={{ backgroundColor: '#dc3545' }}>Select</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No PODs available for this store.</p>
                    )}
                </Row> */}
            </div>
        </div>
    )
}
