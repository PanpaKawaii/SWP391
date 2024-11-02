import React from "react";
import "./Header.css"; // Nhập file CSS
import avatar from "../ManagerImage/avatar.jpg"; // Nhập file CSS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Nhập FontAwesomeIcon
// import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Nhập biểu tượng kính lúp
export default function Header() {
  const userId = localStorage.getItem("UserId") || "Tên người dùng"; // Thay thế 'Tên người dùng' bằng giá trị mặc định
  const userRole = localStorage.getItem("UserRole") || "Chức vụ"; // Thay thế 'Chức vụ' bằng giá trị mặc định
  // const staffIamge = localStorage.getItem("image");
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
          <div className="username">{userId}</div> {""}
          <div className="role">{userRole}</div> {/* Chức vụ */}
        </div>
        <div className="admin-avatar">
          {" "}
          <img src={avatar} alt="Admin Avatar" /> {/* Hình đại diện */}
        </div>
      </div>
    </div>
  );
}
