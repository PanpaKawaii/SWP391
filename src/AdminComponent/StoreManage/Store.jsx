import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./style.css";
import api from "../api/axios";
import { message, Popconfirm, Checkbox } from "antd";
import "./style.css";
export default function Store() {
  const [stores, setStores] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const fetchStores = async () => {
    try {
      const response = await api.get("Store");
      setStores(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleEdit = (store) => {
    setEditingStore(store);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingStore(null);
  };

  const handleUpdateStore = async () => {
    const missingFields = [];
    if (!editingStore.name) missingFields.push("Tên cửa hàng");
    if (!editingStore.address) missingFields.push("Địa chỉ");
    if (!editingStore.contact) missingFields.push("Số điện thoại");
    if (!editingStore.image) missingFields.push("URL hình ảnh");

    if (missingFields.length > 0) {
      message.error(`Vui lòng nhập ${missingFields.join(", ")}`);
      return;
    }

    try {
      await api.put(`Store/${editingStore.id}`, {
        ...editingStore,
        status: editingStore.status === "Đang hoạt động" ? "Đang hoạt động" : "Dừng hoạt động", // Cập nhật trạng thái
      });
      setShowEditModal(false);
      fetchStores(); // Refresh the stores list
      message.success("Sửa thành công");
    } catch (err) {
      console.log(err);
      message.error("Có lỗi xảy ra khi cập nhật");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingStore({ ...editingStore, [name]: type === "checkbox" ? checked : value });
  };

  const handleCheckboxChange = (e) => {
    // Cập nhật trạng thái dựa trên checkbox
    const isChecked = e.target.checked;
    setEditingStore({ ...editingStore, status: isChecked ? "Đang hoạt động" : "Dừng hoạt động" });
  };



  return (
    <div className="admin-store-container">
      <div className="title-store">
        <h1>
          Quản lý chi nhánh
        </h1>
        <Button>
          <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to="/addstore">
              Thêm chi nhánh
          </Link>
        </Button>
      </div>
      <div
       
       
      >
        <div className="row"  >
          {stores.sort((a, b) => b.id - a.id).map((store) => (
            <div className="col-md-4" key={store.id}>
              <div className="card store-card">
                <img
                  src={store.image}
                  alt="Store 1"
                  className="store-img card-img-top"
                  
                />
                <div className="card-body">
                  <h5 className="card-title">{store.name}</h5>
                  <p>Địa chỉ: {store.address}</p>
                  <p>Số điện thoại: {store.contact}</p>
                  <p>Giờ mở cửa: 7:00 - 00:00 </p>
                  <p style={{
                    color: store.status === "Đang hoạt động" ? "green" : 
                           store.status === "Dừng hoạt động" ? "red" : "black",
                    padding: "5px",
                    borderRadius: "5px",
                    fontStyle: "italic",
                  }}>
                    {store.status}
                  </p>

                  <Card.Footer className="d-flex justify-content-between">
                    <button className="admin-edit-button" onClick={() => handleEdit(store)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </Card.Footer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa chi nhánh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên chi nhánh</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editingStore?.name || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editingStore?.address || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={editingStore?.contact || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL hình ảnh</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={editingStore?.image || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Checkbox
                checked={editingStore?.status === "Đang hoạt động"}
                onChange={handleCheckboxChange}
              >
                Đang hoạt động
              </Checkbox>
            </Form.Group>
            <Popconfirm
              title="Xác nhận lưu thay đổi"
              description="Bạn có chắc chắn muốn lưu những thay đổi này?"
              onConfirm={handleUpdateStore}
              okText="Lưu"
              cancelText="Hủy"
            >
              <Button className="admin-edit-button" variant="primary">Lưu thay đổi</Button>
            </Popconfirm>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
