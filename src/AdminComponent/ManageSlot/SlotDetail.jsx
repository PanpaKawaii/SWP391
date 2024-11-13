import React, { useEffect, useState } from "react";
import { Table, message, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { Link } from "react-router-dom";


const SlotDetail = () => {
    const podId = useParams(); // Lấy id từ URL
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("podId:", podId);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`https://localhost:7166/api/Slot`); // Gọi API để lấy slot theo idpod
            setSlots(response.data.filter((slot) => slot.podId == podId.id)); // Filter slots by podId
        } catch (error) {
            console.error("Failed to fetch slots:", error);
            message.error("Không thể tải dữ liệu slot");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, [podId]);

    if (loading) {
        return <Spin />;
    }
    
    const columns = [
        {
            title: "ID Slot",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên Slot",
            dataIndex: "name",
            key: "name",
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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: 'Chỉnh sửa',
            key: 'edit',
            render: (record) => (
                <Button type="primary" onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
            ),
        },
        // Thêm các cột khác nếu cần
    ];

    return (
        <div>
            <div>
            <h1>Danh sách Slot cho POD ID: {podId.id}</h1>
            <Button>
          <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to={`/addslot/${podId.id}`}>
              Thêm Slot
          </Link>
        </Button>
            </div>
            <Table
                columns={columns}
                dataSource={slots.filter((slot) => slot.podId == podId.id)} // Filter slots for the specific pod
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default SlotDetail;