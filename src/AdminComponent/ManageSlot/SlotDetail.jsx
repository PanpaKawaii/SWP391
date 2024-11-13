import React, { useEffect, useState } from "react";
import { Table, message, Spin, Modal, Form, Button, Checkbox } from "antd";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import { Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const SlotDetail = () => {
    const podId = useParams();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSlot, setCurrentSlot] = useState(null);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`https://localhost:7166/api/Slot`);
            setSlots(response.data.filter((slot) => slot.podId == podId.id));
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
        setCurrentSlot(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCurrentSlot(null);
    };

    const handleUpdateSlot = async () => {
        if (!currentSlot.name || !currentSlot.startTime || !currentSlot.endTime || !currentSlot.price) {
            message.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            await axios.put(`https://localhost:7166/api/Slot/${currentSlot.id}`, currentSlot);
            message.success("Cập nhật slot thành công");
            fetchSlots();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to update slot:", error);
            message.error("Cập nhật slot thất bại");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentSlot({ ...currentSlot, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        // Cập nhật trạng thái dựa trên checkbox
        const isChecked = e.target.checked;
        setCurrentSlot({ ...currentSlot, status: isChecked ? "Đang hoạt động" : "Dừng hoạt động" });
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
            align: "center",
            render: (status) => {
              let color;
              switch (status) {
                case "Đang hoạt động":
                  color = "green";
                  break;
                case "Dừng hoạt động":
                  color = "red";
                  break;
                default:
                  color = "default"; // You can set a default color if needed
              }
              return (
                <Tag color={color} >
                  {status}
                </Tag>
              );
            },
          },
        {
            title: 'Chỉnh sửa',
            key: 'edit',
            render: (record) => (
                <Button className="slot-button" onClick={() => handleEdit(record)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            ),
        },
    ];

    return (
        <div className="admin-slot-detail-container">
            <div className="admin-slot-title">
                <h1>Danh sách Slot:</h1>
                <Button type="primary">
                <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to={`/addslot/${podId.id}`}>
                    Thêm Slot
                </Link>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={slots}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Chỉnh sửa Slot"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="back" onClick={handleCloseModal}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpdateSlot}>
                        Lưu thay đổi
                    </Button>,
                ]}
            >
                {currentSlot && (
                    <Form>
                        <Form.Item label="Tên Slot">
                            <input type="text" name="name" value={currentSlot.name} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Thời gian bắt đầu">
                            <input type="number" name="startTime" value={currentSlot.startTime} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Thời gian kết thúc">
                            <input type="number" name="endTime" value={currentSlot.endTime} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Giá">
                            <input type="number" name="price" value={currentSlot.price} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Trạng thái">
                        <Checkbox
                            checked={currentSlot?.status === "Đang hoạt động"}
                            onChange={handleCheckboxChange}
                        >
                            Đang hoạt động
                        </Checkbox>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default SlotDetail;