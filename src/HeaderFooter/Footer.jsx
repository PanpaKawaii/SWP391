import React from 'react'
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {

    const [TYPEs, setTYPEs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-brand'>
                    <h3>InnoSpace</h3>
                    <p>InnoSpace là hệ thống quản lý và đặt chỗ làm việc cá nhân, giúp người dùng dễ dàng tìm kiếm và đặt chỗ theo nhu cầu.</p>
                </div>
                <div className='footer-solution'>
                    <h3>Giải pháp</h3>
                    <p>Phòng đơn 1 người</p>
                    <p>Phòng đôi 2 người</p>
                    <p>Phòng nhóm 6 người</p>
                    <p>Phòng họp 10 người</p>
                </div>
                <div className='footer-location'>
                    <h3>Địa chỉ</h3>
                    <p>info@innospace.com.vn</p>
                    <p>12 Đường Sáng Tạo, Thủ Đức, TPHCM</p>
                    <p>+84 922 678 301</p>
                    <p>34 Đại lộ Kinh Doanh, Thủ Đức, TPHCM</p>
                    <p>+84 995 678 017</p>
                </div>
            </div>
            <div className='footer-end'>
                <p>Copyright © 2024 Tactic</p>
            </div>
        </div>
    )
}
