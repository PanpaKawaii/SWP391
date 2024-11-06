import React, { useEffect, useState } from "react";
import "./Header.css"; // Nhập file CSS
import axios from "axios";

export default function Header() {
  const userId = localStorage.getItem("UserId") || "Tên người dùng"; // Thay thế 'Tên người dùng' bằng giá trị mặc định
  const userRole = localStorage.getItem("UserRole") || "Chức vụ"; // Thay thế 'Chức vụ' bằng giá trị mặc định
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
    <div className="staff-header-container">
      {" "}
      {/* Sử dụng lớp CSS */}
      <div className="search-bar">
        {" "}
        {/* Div cho thanh tìm kiếm */}
        <div className="search-bar">
          {" "}
          {/* Div cho thanh tìm kiếm */}
          {/* <CDBInput 
          type="text"
          placeholder="Tìm kiếm..."
          style={{ width: '100%', maxWidth: '300px' }} // Đặt chiều rộng tối đa cho thanh tìm kiếm
        /> */}
          {/* <FontAwesomeIcon icon={faSearch} className="search-icon" />  */}
        </div>
        {/* <FontAwesomeIcon icon={faSearch} className="search-icon" />  */}
      </div>
      <div className="d-flex align-items-center">
        <div className="inno">INNO SPACE</div>{" "}
        {/* Div cho hình đại diện và thông tin người dùng */}
        <div className="user-info">
          <div className="username">
            {name} {""}
          </div>
          <div className="role">{userRole}</div> {/* Chức vụ */}
        </div>
        <div className="admin-avatar">
          {" "}
          <img src={image} alt="Admin Avatar" /> {/* Hình đại diện */}
        </div>
      </div>
    </div>
  );
}
