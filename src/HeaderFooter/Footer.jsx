import React, { useState, useEffect } from 'react';
import './Footer.css';
import logo from '../BackgroundImage/logo.jpg';

export default function Footer() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stores, setStores] = useState([]);

    const fetchData = async () => {
        try {
            const typeResponse = await fetch(`https://localhost:7166/api/Type`);
            const storeResponse = await fetch(`https://localhost:7166/api/Store`);
            if (!typeResponse.ok || !storeResponse.ok) throw new Error('Network response was not ok');
            const typeData = await typeResponse.json();
            const storeData = await storeResponse.json();
            setTypes(typeData);
            setStores(storeData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <footer className="footer">
            <div className='footer-container'>
                <div className='footer-content'>
                    <div className='about-us'>
                        <p className='footer-title'>InnoSpace</p>
                        <p className="footer-list">
                            InnoSpace là một không gian làm việc hiện đại, được thiết kế để mang lại sự thoải mái và hiệu suất cao cho các cá nhân và doanh nghiệp. Với các tiện ích và dịch vụ được cung cấp, chúng tôi cam kết mang lại cho bạn một môi trường làm việc lý tưởng.
                        </p>
                    </div>
                    <div className='solution'>
                        <div className='solution-header'>
                            <p className='footer-title'>Giải pháp</p>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>Error fetching types: {error.message}</p>
                            ) : (
                                <div className="footer-list">
                                    {types.map((type) => (
                                        <div key={type.id} className="footer-item">
                                            <p>{type.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='contact'>
                        <p className='footer-title'>Liên hệ</p>
                        <div className="footer-list">
                            {stores.map((store) => (
                                <div key={store.id} className="contact-item">
                                    <p>
                                        {store.name}: {store.address} - {store.contact}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <div>
                    <p className="copyright-text">
                        &copy; 2022 Company Name. All rights reserved.
                        <a href="/" className="terms-link"> Terms & Conditions</a>
                        <span>&middot;</span>
                        <a href="/" className="privacy-link"> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </footer >
    );
}
