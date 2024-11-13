import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

export default function AddSlot() {
    const { id } = useParams(); // Lấy id từ URL
    const podId = id; 
  
  console.log("Pod ID:", podId);

  const [slotName, setSlotName] = useState("");
  const [slotTimeStart, setSlotTimeStart] = useState("");
  const [slotTimeEnd, setSlotTimeEnd] = useState("");
  const [status, setStatus] = useState(false);
  const [maxId, setMaxId] = useState(0);
  const navigate = useNavigate();
  const slotNameRef = useRef(null);
  const slotTimeStartRef = useRef(null);
  const slotTimeEndRef = useRef(null);

  useEffect(() => {
    const fetchMaxSlotId = async () => {
      try {
        const slotResponse = await axios.get("https://localhost:7166/api/Slot");
        const maxId = Math.max(
          ...slotResponse.data.map((slot) => slot.id),
          0
        );
        setMaxId(maxId);
      } catch (err) {
        console.error("Error fetching Slot list:", err);
      }
    };
    fetchMaxSlotId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new slot with podId:", podId);
    
    // New validation logic
    const missingFields = [];
    
    if (!slotName) {
        missingFields.push("Tên Slot");
        slotNameRef.current.focus(); // Focus on the first empty field
    }
    if (!slotTimeStart) {
        missingFields.push("Thời gian bắt đầu");
        if (missingFields.length === 1) slotTimeStartRef.current.focus(); // Focus on the first empty field
    }
    if (!slotTimeEnd) {
        missingFields.push("Thời gian kết thúc");
        if (missingFields.length === 1) slotTimeEndRef.current.focus(); // Focus on the first empty field
    }

    // If there are missing fields, show an error message
    if (missingFields.length > 0) {
        message.error(`Vui lòng nhập: ${missingFields.join(", ")}`); // Error message
        return; // Stop if there are missing fields
    }

    const newSlot = {
        id: maxId + 1,
        name: slotName,
        startTime: parseInt(slotTimeStart),
        endTime: parseInt(slotTimeEnd),
        price: price,
        status: status ? "Đang hoạt động" : "Không hoạt động",
        podId: podId,
    };
    console.log("Sending new slot:", newSlot);
    try {
      const response = await axios.post("https://localhost:7166/api/Slot", newSlot);
      console.log("Response:", response.data);
      message.success("Slot được thêm thành công!");
      navigate(`/slotdetail/${podId}`);
      setSlotName("");
      setSlotTimeStart("");
      setSlotTimeEnd("");
      setStatus(false);
    } catch (error) {
      if (error.response) {
        console.error("Error adding slot:", error.response.data);
        message.error(`Không thể thêm slot: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        message.error("Không có phản hồi từ server. Vui lòng thử lại sau.");
      } else {
        console.error("Error:", error.message);
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="admin-slot-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSlotName">
          <Form.Label>Tên Slot</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tên Slot"
            value={slotName}
            onChange={(e) => setSlotName(e.target.value)}
            ref={slotNameRef}
          />
        </Form.Group>
        <Form.Group controlId="formSlotTimeStart">
          <Form.Label>Thời gian bắt đầu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Thời gian bắt đầu"
            value={slotTimeStart}
            onChange={(e) => setSlotTimeStart(e.target.value)}
            ref={slotTimeStartRef}
          />
        </Form.Group>
        <Form.Group controlId="formSlotTimeEnd">
          <Form.Label>Thời gian kết thúc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Thời gian kết thúc"
            value={slotTimeEnd}
            onChange={(e) => setSlotTimeEnd(e.target.value)}
            ref={slotTimeEndRef}
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Check
            type="checkbox"
            label="Có sẵn"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </Form.Group>
        <div className="back-button">
          <Button variant="primary" type="submit">
            <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to="/slot">
              Quay lại
            </Link>
          </Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </div>
      </Form>
    </div>
  );
}
