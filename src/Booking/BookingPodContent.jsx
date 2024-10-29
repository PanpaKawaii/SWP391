import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import './BookingPodContent.css';
import ScrollToTop from '../ScrollToTopComponent/ScrollToTop';
import { imagePODs } from '../assets/listPODs';

export default function BookingPodContent() {

    const [StoreId, setStoreId] = useState(null);
    const { pathname } = useLocation();
    console.log(pathname);
    console.log('StoreId: ', StoreId);
    const getStoreId = useParams();

    useEffect(() => {
        setStoreId(null);
        setStoreId(getStoreId);
        console.log('StoreId: ', StoreId);
    }, [pathname]);

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState(null);
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

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSLOTs(slotData);

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

    // Lấy Pods có status là Đang hoạt động
    const filteredPods = Pods ? Pods.filter(pod => pod.status === 'Đang hoạt động') : [];

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
    const filteredResults = filteredPods ? filteredPods.filter(pod =>
        (pod.storeId == StoreId.Id || !StoreId.Id) &&
        (pod.storeId == selectedStore || !selectedStore) &&
        (pod.name === selectedPod || !selectedPod) &&
        (pod.typeId.toString() === selectedType.toString() || !selectedType.toString()) &&
        pod.name.toLowerCase().includes(podName.toLowerCase()) &&
        STOREs.filter(store => store.status === 'Đang hoạt động').some(store => store.id === pod.storeId)
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

    const getSlotPrice = (podId) => {
        const slot = SLOTs ? SLOTs.find(slot => slot.podId === podId) : null;
        return slot ? slot.price : null;
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

    const handleReset = () => {
        setSelectedStore('');
        setSelectedPod('');
        setSelectedType('');
        setSelectedUtility('');
        setPodName('');
    };


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="border" role="status" style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='POD-booking-pod'>

            <div className='search-container'>

                <Form className='search' onSubmit={handleSubmit}>

                    {StoreId.Id ?
                        (<div className='search-title'><h1>POD có sẵn</h1></div>) : (
                            <Form.Group controlId='formStore' className='form-group'>
                                <Form.Control as='select' value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                                    <option value=''>[Cửa hàng]</option>
                                    {STOREs && STOREs.map(store => (
                                        <option key={store.id} value={store.id}>{store.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )
                    }

                    <Form.Group controlId='formPod' className='form-group'>
                        <Form.Control as='select' value={selectedPod} onChange={(e) => setSelectedPod(e.target.value)}>
                            <option value=''>[Tên POD]</option>
                            {uniquePodName && uniquePodName.map(pod => (
                                <option key={pod.id} value={pod.name}>{pod.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value=''>[Loại POD]</option>
                            {TYPEs && TYPEs.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select' value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
                            <option value=''>[Nội thất]</option>
                            {UTILITIes && UTILITIes.map(utility => (
                                <option key={utility.id} value={utility.id}>{utility.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='Tên POD' value={podName} onChange={(e) => setPodName(e.target.value)} />
                    </Form.Group>

                    <Button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</Button>

                </Form>

            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle table border-bottom'>
                    {/* <thead className='list-header'>
                        <tr>
                            <th className='list-index'>STT</th>
                            <th>Ảnh</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Cửa hàng</th>
                            <th>Nội thất</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead> */}
                    <tbody className='list-body'>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((pod, index) => (
                                <tr key={index} className='border-bottom list-item'>
                                    <td className='list-index'>{index + 1}</td>
                                    <td>
                                        {/* <img src={imagePODs.find(image => image.id === pod.id)?.image} alt={pod.name} /> */}
                                        <img src={pod.image} alt={pod.name} />
                                    </td>
                                    <td>
                                        {/* <p>ID: {pod.id}</p> */}
                                        <h3><b>{pod.name}</b></h3>
                                        {[...Array(pod.rating)].map((_, i) => (
                                            <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                        ))}
                                        <p>{getSlotPrice(pod.id).toLocaleString('vi-VN')}đ/slot</p>
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
                                        <Link to={`../../../booking/pod/${pod.id}`}>
                                            <Button className='btn' >CHI TIẾT</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan='7'>Không tìm thấy POD nào.</td></tr>
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
                                                    <Button className='btn' style={{ backgroundColor: '#dc3545' }}>SELECT</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <span>Không tìm thấy POD nào.</span>
                    )}
                </Row> */}
            </div>
        </div>
    )
}
