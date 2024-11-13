import React, { useEffect, useState } from "react";
import { Table, message, Spin, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { Link } from "react-router-dom";


const SlotDetail = () => {
    const podId = useParams(); // Lấy id từ URL
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("podId:", podId);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [currentSlot, setCurrentSlot] = useState(null); // State to hold the current slot being edited

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

    const handleEdit = (record) => {
        setCurrentSlot(record); // Set the current slot to be edited
        setIsModalVisible(true); // Show the modal
    };

    const handleOk = async () => {
        try {
            await axios.put(`https://localhost:7166/api/Slot/${currentSlot.id}`, currentSlot); // Call API to update the slot
            message.success("Cập nhật slot thành công"); // Success message
            fetchSlots(); // Refresh the slots after updating
        } catch (error) {
            console.error("Failed to update slot:", error);
            message.error("Cập nhật slot thất bại"); // Error message
        } finally {
            setIsModalVisible(false); // Close the modal
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close the modal
    };

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
            <Modal
                title="Chỉnh sửa Slot"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* You can add a form here to edit the slot details */}
                {currentSlot && (
                    <div>
                        <p>
                            Tên: <input type="text" value={currentSlot.name} onChange={(e) => setCurrentSlot({ ...currentSlot, name: e.target.value })} />
                        </p>
                        <p>
                            Thời gian bắt đầu: <input type="starttime" value={currentSlot.startTime} onChange={(e) => setCurrentSlot({ ...currentSlot, startTime: e.target.value })} />
                        </p>
                        <p>
                            Thời gian kết thúc: <input type="endtime" value={currentSlot.endTime} onChange={(e) => setCurrentSlot({ ...currentSlot, endTime: e.target.value })} />
                        </p>
                        <p>
                            Giá: <input type="number" value={currentSlot.price} onChange={(e) => setCurrentSlot({ ...currentSlot, price: e.target.value })} />
                        </p>
                        <p>
                            Trạng thái: <input type="text" value={currentSlot.status} onChange={(e) => setCurrentSlot({ ...currentSlot, status: e.target.value })} />
                        </p>
                        {/* Add more fields as necessary */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SlotDetail;