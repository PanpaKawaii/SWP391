import React, { useEffect, useState } from "react";
import "./HomeStyle.css";
import welcomeImage from "../ManagerImage/avatar.jpg"; // Thay thế bằng đường dẫn đến hình ảnh chào mừng
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const apiUser = "https://localhost:7166/api/User";
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    const UserIdInt = parseInt(UserId, 10);
    setId(UserIdInt);
  }, [UserId]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUser}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error; // Ném lỗi để xử lý ở nơi khác
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (id) {
        try {
          const userData = await fetchUser(); // Gọi hàm để lấy thông tin người dùng
          if (userData) {
            setName(userData.name);
            setImage(userData.image);
          } else {
            console.error("No admin user found");
          }
        } catch (error) {
          setError("Error fetching users: " + error.message);
          console.error("Error fetching users:", error);
        }
      }
    };

    getUserData();
  }, [id]);

  return (
    <div className="welcome-container">
      {error && <p className="error-message">{error}</p>}
      <img src={image} alt="Welcome" className="welcome-image" />
      <h1>Chào mừng, {name}!</h1>
      <p>
        Chúng tôi rất vui được có bạn ở đây. Hãy khám phá các chức năng bên
        cạnh!
      </p>
    </div>
  );
}
