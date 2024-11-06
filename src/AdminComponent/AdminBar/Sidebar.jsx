import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"; // Import icon

import {
  faSquare,
  faUser,
  faChartBar,
  faSignOutAlt,
  faCrown,
  faCircleUser,
  faFileInvoiceDollar,
  faMugHot,
  faStore,
  faBoxes,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleResourceDropdown = () => {
    setIsResourceDropdownOpen(!isResourceDropdownOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('UserId')
      localStorage.removeItem('UserRole')
      console.log('Loged out')
      window.location.href = 'http://localhost:5173/signinsignup';
  }

  return (
    <div className="nav">
    <div className="admin-nav-container">
      <div id="mySidenav" className={`sidenav ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/">
            <h2 style={{ fontFamily: "Arial", borderBottom: "1px solid grey" }}>
              Admin Panel
            </h2>
          </Link>
        </div>
        {/* <Link
          to="/order"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <FontAwesomeIcon className="icon" icon={faFileClipboard} /> Đơn đang chờ
          </span>
         
        </Link> */}
        {/* <Link
          to="/booking-order"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <FontAwesomeIcon className="icon" icon={faBurger} /> Order thêm
          </span>
          <Badge
            count={
              <FontAwesomeIcon
                icon={faCommentDollar}
                style={{
                  color: "#fff",
                  fontSize: "10px",
                }}
              />
            }
            style={{
              backgroundColor: "#52c41a",
              fontSize: "10px",
              height: "18px",
              minWidth: "18px",
              lineHeight: "18px",
              padding: "0 4px",
              marginBottom: "1.2rem",
              borderRadius: "56%",
            }}
          />
        </Link> */}
        <Link to="/history">
          <FontAwesomeIcon className="icon" icon={faFileInvoiceDollar} /> Quán
          lý đơn hàng
          
        </Link>
        <button
          className={`dropdown-btn ${isResourceDropdownOpen ? "open" : ""}`}
          onClick={toggleResourceDropdown}
        >
          <FontAwesomeIcon className="icon" icon={faSquare} />
          Quản lí tài nguyên
          <FontAwesomeIcon 
      icon={faCaretDown} // Sử dụng icon từ Font Awesome
            className={isResourceDropdownOpen ? "active" : ""}
          />
        </button>
        <div
          className={`dropdown-container ${
            isResourceDropdownOpen ? "open" : ""
          }`}
        >
          <Link to="/store">
            <FontAwesomeIcon className="icon" icon={faStore} /> Quản lí cửa hàng
          </Link>
          <Link to="/pod">
            <FontAwesomeIcon className="icon" icon={faBoxes} /> Quản lí POD
          </Link>
          <Link to="/product">
            <FontAwesomeIcon className="icon" icon={faMugHot} /> Quản lí sản
            phẩm
          </Link>
        </div>

        <button
          className={`dropdown-btn ${isAccountDropdownOpen ? "open" : ""}`}
          onClick={toggleAccountDropdown}
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          Quản lí tài khoản
          <FontAwesomeIcon 
      icon={faCaretDown} // Sử dụng icon từ Font Awesome
            className={isResourceDropdownOpen ? "active" : ""}
          />
        </button>
        <div
          className={`dropdown-container ${
            isAccountDropdownOpen ? "open" : ""
          }`}
        >
          <Link to="/customer">
            <FontAwesomeIcon className="icon" icon={faCrown} />
            Khách hàng
          </Link>
          <Link to="/staff">
            <FontAwesomeIcon className="icon" icon={faCircleUser} /> Nhân viên
          </Link>
        </div>
        <Link to="/report">
          <FontAwesomeIcon className="icon" icon={faChartBar} /> Báo cáo doanh
          thu
        </Link>
        <a onClick={handleLogout} style={{cursor: 'pointer'}}>
          <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Đăng xuất
        </a>
      </div>

      <div id="main" className={isOpen ? "shifted" : ""}>
        <span
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={toggleNav}
        >
          &#9776;
        </span>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
