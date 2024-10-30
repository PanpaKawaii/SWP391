import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import './BookingStoreDetailContent.css';

import BookingPodContent from './BookingPodContent';

import { imageSTOREs } from '../../assets/listSTOREs';
import single1 from '../../assets/PODs/single1.jpg'

export default function BookingStoreDetailContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
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

                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                setBOOKINGs(bookingData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const StoreId = useParams();
    const Store = STOREs ? STOREs.find(obj => {
        return obj.id == StoreId.Id;
    }) : null;

    const navigate = useNavigate();
    if (Store && Store.status !== 'Đang hoạt động') {
        navigate('/booking/store')
    }

    // Lấy đánh giá của STORE dựa trên đánh giá của các Booking
    const getStoreBookingRating = (storeId) => {
        const podsOfStore = PODs ? PODs.filter(pod => pod.storeId == storeId) : [];
        const bookingsOfPods = podsOfStore.length > 0 ? BOOKINGs.filter(booking => podsOfStore.some(pod => pod.id == booking.podId)) : [];
        const filteredBooking = bookingsOfPods ? bookingsOfPods.filter(booking => booking.rating !== null && booking.rating > 0) : [];
        const rating = filteredBooking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return rating / filteredBooking.length;
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
        <div className='POD-booking-store-detail'>
            {Store ? (
                <div>
                    <div className='store-detail-container'>
                        {/* <img src={imageSTOREs.find(image => image.id === Store.id)?.image} alt={Store.name} /> */}
                        <img src={Store.image} alt={Store.name} />

                        <div className='store-detail'>
                            <h1><b>{Store.name}</b></h1>
                            {Store.status === 'Đang hoạt động' && <h5 style={{ color: '#28a745' }}><b>Đang hoạt động</b></h5>}
                            {Store.status === 'Dừng hoạt động' && <h5 style={{ color: '#dc3545' }}><b>Dừng hoạt động</b></h5>}
                            <span style={{ color: 'gold', fontSize: '3em' }}><b>{getStoreBookingRating(Store.id)}</b><i className='fa-solid fa-star'></i></span>
                            <p><b>Địa chỉ:</b> {Store.address}</p>
                            <p><b>Liên hệ:</b> {Store.contact}</p>
                            <p><b>Trạng thái:</b> {Store.status}</p>
                            <p className='short-detail'>
                                <b>Đa dạng loại hình:</b> <span>
                                    {TYPEs && TYPEs.map((type, index) => (
                                        <span key={type.id}>
                                            {type.name}{index < TYPEs.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </span>
                            </p>
                            {TYPEs && TYPEs.length > 0 ?
                                (
                                    <p><b>Sức chứa:</b> {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                        <span className='capacity-icon'> người <i className='fa-solid fa-user'></i></span>
                                    </p>
                                ) : null
                            }
                        </div>
                    </div>
                    <BookingPodContent />
                </div>
            ) : (
                <span>Không tìm thấy cửa hàng nào.</span>
            )}
        </div>
    )
}
