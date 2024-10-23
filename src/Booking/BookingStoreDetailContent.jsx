import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import './BookingStoreDetailContent.css';

import BookingPodContent from './BookingPodContent';

import { imageSTOREs } from '../assets/listSTOREs';
import single1 from '../assets/PODs/single1.jpg'

export default function BookingStoreDetailContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

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
                        <img src={imageSTOREs.find(image => image.id === Store.id)?.image} alt={Store.name} />
                        <div className='store-detail'>
                            <h1><b>{Store.name}</b></h1>
                            <div className='rating'>
                                <span style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                {Array.from({ length: Store.rating }, (_, index) => (
                                    <span key={index} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                ))}
                            </div>
                            <p>Địa chỉ: {Store.address}</p>
                            <p>Liên hệ: {Store.contact}</p>
                            <p>Trạng thái: {Store.status}</p>
                            <p>Đa dạng các loại hình: POD phòng đơn, POD phòng đôi, POD phòng tập thể</p>
                            <p>1 - 10 người <i className='fa-solid fa-user'></i></p>
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
