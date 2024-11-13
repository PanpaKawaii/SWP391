import React, { useEffect, useState } from "react";
import { Table, message, Spin, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const SlotDetail = () => {
    const podId = useParams(); // Lấy id từ URL
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [currentSlot, setCurrentSlot] = useState(null); // State to hold the current slot being edited

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`https://localhost:7166/api/Slot`); // Gọi API để lấy slot theo idpod
            setSlots(response.data.filter((slot) => slot.podId == podId.id)); // Filter slots by podId
            console.log("podId:", podId);
            console.log(response.data.filter((slot) => slot.podId == podId.id));
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
    const handleEdit = (record) => {
        setCurrentSlot(record); // Set the current slot to be edited
        setIsModalVisible(true); // Show the modal
    };

    // New function to handle form submission
    const handleFormSubmit = async (values) => {
        // Logic to update the slot using the API
        // You can use the currentSlot state to get the ID and other details
        // Call the API to update the slot
        // After successful update, fetch the slots again and close the modal
    };

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
            <h1>Danh sách Slot cho POD ID: {podId.id}</h1>
            <Table
                columns={columns}
                dataSource={slots.filter((slot) => slot.podId == podId.id)} // Filter slots for the specific pod
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Chỉnh sửa Slot"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={currentSlot} // Set initial values from the current slot
                    onFinish={handleFormSubmit} // Handle form submission
                >
                    <Form.Item name="name" label="Tên Slot">
                        <Input />
                    </Form.Item>
                    <Form.Item name="startTime" label="Thời gian bắt đầu">
                        <Input />
                    </Form.Item>
                    <Form.Item name="endTime" label="Thời gian kết thúc">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Giá">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SlotDetail;