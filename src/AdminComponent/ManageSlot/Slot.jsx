import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Select, Space, Input, Button } from 'antd';
import { Table } from 'antd';

export default function Slot() {
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedPod, setSelectedPod] = useState('');
    const [slotData, setSlotData] = useState([]);
    const [storeData, setStoreData] = useState([]);
    const [podData, setPodData] = useState([]);
    const [originalSlotData, setOriginalSlotData] = useState([]);
    const [searchPodValue, setSearchPodValue] = useState(''); // State for search input value

    const handleStoreChange = (value) => {
        setSelectedStore(value);
        setSlotData(originalSlotData);
    };

    const handlePodChange = (value) => {
        setSelectedPod(value);
    };

    const apiStore = "https://localhost:7166/api/Store";
    const fetchStoreData = async () => {
        try {
            const response = await axios.get(apiStore);
            if (response.data && response.data.length > 0) {
                setStoreData(response.data);
            } else {
                console.error('No store data found');
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    };

    const apiPod = "https://localhost:7166/api/Pod";
    const fetchPodData = async () => {
        try {
            const response = await axios.get(apiPod);
            if (response.data && response.data.length > 0) {
                setPodData(response.data);
            } else {
                console.error('No pod data found');
            }
        } catch (error) {
            console.error('Error fetching pod data:', error);
        }
    };

    const apiSlot = "https://localhost:7166/api/Slot";
    const fetchSlotData = async () => {
        try {
            const response = await axios.get(apiSlot);
            if (response.data && response.data.length > 0) {
                setSlotData(response.data);
                setOriginalSlotData(response.data);
            } else {
                console.error('No slot data found');
            }
        } catch (error) {
            console.error('Error fetching slot data:', error);
        }
    };

    useEffect(() => {
        fetchStoreData();
        fetchPodData();
        fetchSlotData();
    }, []);

    // Debugging: Log the fetched data
    useEffect(() => {
        console.log('Store Data:', storeData);
        console.log('Pod Data:', podData);
        console.log('Slot Data:', slotData);
        console.log('Selected Store:', selectedStore);
        console.log('Selected Pod:', selectedPod);
    }, [storeData, podData, slotData, selectedStore, selectedPod]);

    const slotColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Slot',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Tên POD',
            dataIndex: 'podId',
            key: 'podId',
            render: (podId) => {
                const pod = podData.find(p => p.id === podId);
                return pod ? pod.name : 'Không có tên POD'; // Return the pod name or a default message if not found
            },
        },
    ];

    const handleSearch = () => {
        // Logic to handle search for slots
        const filteredSlots = originalSlotData.filter(slot => {
            const pod = originalPodData.find(p => p.id === slot.podId);
            const isStoreMatch = selectedStore ? pod && pod.storeId === selectedStore : true; // If no store selected, show all
            const isPodMatch = searchPodValue ? pod && pod.name && pod.name.toLowerCase().includes(searchPodValue.toLowerCase()) : true; // Check if pod name matches
            return isStoreMatch && isPodMatch; // Return true if both conditions are satisfied
        });

        // Update slotData to only show filtered slots
        setSlotData(filteredSlots); // Update state with filtered slots

        // Reset selected store and pod
        setSelectedStore(''); // Clear selected store
        setSelectedPod(''); // Clear selected pod
    };

    return (
        <div>
            <h1>Quản lí Slot</h1>
            <div>
                <Space wrap>
                    <Select
                        defaultValue="Chi nhánh"
                        style={{ width: 120 }}
                        onChange={handleStoreChange}
                        options={storeData.map((store) => ({
                            value: store.id,
                            label: store.name
                        }))}
                    />
                    <Input
                        placeholder="Tìm kiếm POD"
                        style={{ width: 120 }}
                        onChange={(e) => setSearchPodValue(e.target.value)} // Update search value on input change
                    />
                    <Button onClick={handleSearch} type="primary">Tìm kiếm</Button>
                </Space>
            </div>
            <div style={{ overflowX: "auto", marginTop: "20px" }}>
                <Table
                    columns={slotColumns} // Define columns for the slot table
                    dataSource={slotData} // Use the original slotData without filtering
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    size="small"
                    bordered
                />
            </div>
        </div>
    )
}
