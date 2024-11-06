import React from 'react'
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {

    const [STOREs, setSTOREs] = useState(null);
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

    return (
        <div className='user-footer'>
            <div className='footer-container'>
                <div className='footer-brand'>
                    <h3><b>InnoSpace</b></h3>
                    <p>InnoSpace là hệ thống quản lý và đặt chỗ làm việc cá nhân, giúp người dùng dễ dàng tìm kiếm và đặt chỗ theo nhu cầu.</p>
                </div>
                <div className='footer-location'>
                    <h3><b>Địa chỉ</b></h3>
                    <p>info@innospace.com.vn</p>
                    {STOREs && STOREs.map((store) => (
                        <div key={store.id}>
                            <p>+84{store.contact.substring(1)}</p>
                            <p>{store.address}</p>
                        </div>
                    ))}
                </div>
                <div className='footer-solution'>
                    <h3><b>Giải pháp</b></h3>
                    {TYPEs && TYPEs.map((type) => (
                        <p key={type.id}>{type.name} {type.capacity} Người</p>
                    ))}
                </div>
            </div>
            <div className='footer-end'>
                <p>Copyright © 2024 Tactic</p>
            </div>
        </div>
    )
}
