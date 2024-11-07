import React, { useEffect, useState } from "react"; // Nhập React và các hook
import axios from "axios"; // Nhập axios để thực hiện các yêu cầu HTTP
import {
  Table,
  Card,
  Button,
  Tag,
  Typography,
  Modal,
  Input,
  Space,
  DatePicker,
  Popconfirm,
  Form,
  message,
  Tabs,
} from "antd"; // Nhập các component từ Ant Design
import {
  SearchOutlined,
  EyeOutlined,
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  ReloadOutlined,
} from "@ant-design/icons"; // Nhập các biểu tượng từ Ant Design
import dayjs from "dayjs"; // Nhập dayjs để xử lý ngày tháng
import isBetween from "dayjs/plugin/isBetween"; // Nhập plugin isBetween để kiểm tra khoảng thời gian
dayjs.extend(isBetween); // Kích hoạt plugin isBetween cho dayjs

const { Title } = Typography; // Destructuring Title từ Typography

const OrderHistory = () => {
  // Khai báo các biến trạng thái để lưu trữ dữ liệu
  const [userData, setUserData] = useState([]); // Dữ liệu người dùng
  const [bookingData, setBookingData] = useState([]); // Dữ liệu đặt chỗ
  const [paymentData, setPaymentData] = useState([]); // Dữ liệu thanh toán
  const [productData, setProductData] = useState([]); // Dữ liệu sản phẩm
  const [orderData, setOrderData] = useState([]); // Dữ liệu đơn hàng
  const [slotData, setSlotData] = useState([]); // Dữ liệu slot
  const [podData, setPodData] = useState([]); // Dữ liệu pod
  const [searchTerm, setSearchTerm] = useState(""); // Thuật ngữ tìm kiếm
  const [selectedBooking, setSelectedBooking] = useState(null); // Đặt chỗ được chọn
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal


  const apiUser = "https://localhost:7166/api/User"; // Địa chỉ API cho người dùng
  const apiBooking = "https://localhost:7166/api/Booking"; // Địa chỉ API cho đặt chỗ
  const apiPayment = "https://localhost:7166/api/Payment"; // Địa chỉ API cho thanh toán
  const apiOrder = "https://localhost:7166/api/BookingOrder"; // Địa chỉ API cho đơn hàng
  const apiProduct = "https://localhost:7166/api/Product"; // Địa chỉ API cho sản phẩm
  const apiSlot = "https://localhost:7166/api/Slot"; // Địa chỉ API cho slot
  const apiPod = "https://localhost:7166/api/Pod"; // Địa chỉ API cho pod

  // Hàm để lấy dữ liệu người dùng
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiUser, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setUserData(response.data.filter((user) => user.role === "User")); // Lưu dữ liệu người dùng có vai trò là "User"
    } catch (error) {
      console.error("Failed to fetch user data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu đặt chỗ
  const fetchBookingData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiBooking, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setBookingData(response.data); // Lưu dữ liệu đặt chỗ
    } catch (error) {
      console.error("Failed to fetch booking data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu đơn hàng
  const fetchOrderData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiOrder, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setOrderData(response.data); // Lưu dữ liệu đơn hàng
    } catch (error) {
      console.error("Failed to fetch order data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu sản phẩm
  const fetchProductData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setProductData(response.data); // Lưu dữ liệu sản phẩm
    } catch (error) {
      console.error("Failed to fetch product data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu thanh toán
  const fetchPaymentData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiPayment, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setPaymentData(response.data); // Lưu dữ liệu thanh toán
    } catch (error) {
      console.error("Failed to fetch payment data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu pod
  const fetchPodData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiPod, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setPodData(response.data); // Lưu dữ liệu pod
    } catch (error) {
      console.error("Failed to fetch pod data:", error); // Log lỗi nếu có
    }
  };

  // Hàm để lấy dữ liệu slot
  const fetchSlotData = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(apiSlot, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setSlotData(response.data); // Lưu dữ liệu slot
    } catch (error) {
      console.error("Failed to fetch slot data:", error); // Log lỗi nếu có
    }
  };

  // useEffect để gọi các hàm lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchUserData();
    fetchBookingData();
    fetchPaymentData();
    fetchOrderData();
    fetchProductData();
    fetchSlotData();
    fetchPodData();
  }, []);


  // Nếu không có dữ liệu, hiển thị thông báo đang tải
  if (
    userData.length === 0 &&
    bookingData.length === 0 &&
    paymentData.length === 0 &&
    productData.length === 0 &&
    orderData.length === 0
  ) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }




 




  // Hàm lấy thông tin slot dựa trên bookingId
  const getSlotInfo = (bookingId) => {
    const slot = slotData.find((slot) =>
      slot.bookings.some((booking) => booking.id === bookingId)
    );
    if (slot) {
      return {
        name: slot.name,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    }
    return null; // Nếu không tìm thấy slot, trả về null
  };

  // Lọc người dùng theo số điện thoại
  const filteredUsers = userData.filter((user) =>
    user.phoneNumber.includes(searchTerm)
  );

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật thuật ngữ tìm kiếm
  };

  // Hàm xử lý xem chi tiết đặt chỗ
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking); // Lưu đặt chỗ được chọn
    setIsModalVisible(true); // Hiển thị modal chi tiết
  };

  // Hàm đóng modal chi tiết
  const handleCloseModal = () => {
    setIsModalVisible(false); // Ẩn modal
    setSelectedBooking(null); // Đặt lại đặt chỗ được chọn
  };



  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount); // Định dạng tiền tệ theo định dạng Việt Nam
  };

  // Hàm định dạng số
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number); // Định dạng số theo định dạng Việt Nam
  };

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YYYY"); // Định dạng ngày theo định dạng DD/MM/YYYY
  };

  // Hàm hiển thị trạng thái đơn hàng
  const renderOrderStatus = (status) => {
    let color;
    switch (status) {
      case "Chưa diễn ra":
        color = "gold"; // Màu vàng cho trạng thái "Chưa diễn ra"
        break;
      case "Đang diễn ra":
        color = "lime"; // Màu xanh lá cho trạng thái "Đang diễn ra"
        break;
      case "Đã kết thúc":
        color = "red"; // Màu đỏ cho trạng thái "Đã kết thúc"
        break;
      case "Đã hủy":
        color = "orange"; // Màu cam cho trạng thái "Đã hủy"
        break;
      case "Đã hoàn tiền":
        color = "gray"; // Màu xám cho trạng thái "Đã hoàn tiền"
        break;
      default:
        color = "cornflowerblue"; // Màu mặc định
    }
    return <Tag color={color}>{status}</Tag>; // Trả về thẻ Tag với màu sắc tương ứng
  };

  // Cột dữ liệu cho bảng người dùng
  const userColumns = [
    { title: "Booking ID", dataIndex: "id", key: "bookingId", align: "center" },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date), // Định dạng ngày
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.name : "Không xác định"; // Trả về tên người dùng hoặc "Không xác định"
      },
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      align: "center",
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.phoneNumber : "Không xác định"; // Trả về số điện thoại hoặc "Không xác định"
      },
    },
    {
      title: "Slot",
      key: "slot",
      render: (_, record) => {
        const slotInfo = getSlotInfo(record.id);
        return slotInfo
          ? `${slotInfo.name} (${slotInfo.startTime}:00 - ${slotInfo.endTime}:00)` // Hiển thị thông tin slot
          : "Không có thông tin"; // Nếu không có thông tin slot
      },
    },
    {
      title: "Nhóm tài khoản",
      key: "type",
      align: "center",
      filters: [
        { text: "V.I.P", value: "VIP" },
        { text: "Khách hàng thường", value: "Regular" },
      ],
      onFilter: (value, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.type === value : false; // Lọc theo loại tài khoản
      },
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? (
          <Tag color={user.type === "VIP" ? "#FFD700" : "cornflowerblue"}>
            {user.type} 
          </Tag>
        ) : (
          "Không xác định" // Nếu không xác định
        );
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Chi tiết",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)} // Xem chi tiết đặt chỗ
        >
          Xem
        </Button>
      ),
    },
  ];

  // Cột dữ liệu cho bảng đơn hàng
  const orderColumns = [
    { title: "OrderId", dataIndex: "id", key: "orderId" },
    { title: "BookingId", dataIndex: "bookingId", key: "bookingId" },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date), // Định dạng ngày
    },
    { title: "ProductId", dataIndex: "productId", key: "productId" },
    {
      title: "Tên sản phẩm",
      key: "productName",
      render: (_, record) => {
        const product = productData.find((p) => p.id === record.productId);
        return product ? product.name : "Không xác định"; // Trả về tên sản phẩm hoặc "Không xác định"
      },
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount), // Định dạng tiền tệ
    },
  ];

  // Nội dung modal chi tiết đặt chỗ
  const modalContent = selectedBooking ? (
    <Tabs defaultActiveKey="1" items={[
      {
        key: "1",
        label: "Thông tin đặt chỗ",
        children: (
          <Card style={{ marginBottom: 10 }}>
            <Table
              dataSource={[selectedBooking]} // Dữ liệu cho bảng
              columns={[
                {
                  title: "Ngày đặt",
                  dataIndex: "date",
                  key: "date",
                  render: (date) => formatDate(date), // Định dạng ngày
                },
                {
                  title: "Pod",
                  key: "pod",
                  render: (_, record) => {
                    const pod = podData.find((p) => p.id === record.podId);
                    return pod ? `${record.podId} - ${pod.name}` : "Không xác định"; // Hiển thị thông tin pod
                  },
                },
                {
                  title: "Slot",
                  key: "slot",
                  render: (_, record) => {
                    const slotInfo = getSlotInfo(record.id);
                    return slotInfo ? slotInfo.name : "N/A"; // Hiển thị thông tin slot
                  },
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => renderOrderStatus(status), // Hiển thị trạng thái đơn hàng
                },
                {
                  title: "Phương thức thanh toán",
                  key: "paymentMethod",
                  render: (_, record) => {
                    const payment = paymentData.find(
                      (p) => p.bookingId === record.id
                    );
                    return payment ? payment.method : "Không có thông tin"; // Hiển thị phương thức thanh toán
                  },
                },
                {
                  title: "Feedback",
                  dataIndex: "feedback",
                  key: "feedback",
                  render: (feedback) => feedback || "Chưa có feedback", // Hiển thị feedback
                },
              ]}
              pagination={false} // Tắt phân trang
              bordered // Bỏ viền
            />
          </Card>
        ),
      },
      {
        key: "2",
        label: "Đặt kèm",
        children: (
          <Card>
            <Table
              dataSource={selectedBooking.bookingOrders} // Dữ liệu cho bảng đơn hàng
              columns={orderColumns} // Cột dữ liệu cho bảng đơn hàng
              pagination={false} // Tắt phân trang
              bordered // Bỏ viền
              rowKey="id" // Khóa cho hàng
            />
          </Card>
        ),
      },
      {
        key: "3",
        label: "Thông tin khách hàng",
        children: (
          <Card style={{ marginBottom: 10, marginTop: 10 }}>
            <p>
              <strong>Tên khách hàng:</strong>{" "}
              {userData.find((user) => user.id === selectedBooking.userId)?.name} 
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {userData.find((user) => user.id === selectedBooking.userId)?.email} 
            </p>
            <p>
              <strong>Số điện thoại:</strong>{" "}
              {
                userData.find((user) => user.id === selectedBooking.userId)
                  ?.phoneNumber // Hiển thị số điện thoại khách hàng
              }
            </p>
            <p>
              <strong>Điểm tích lũy:</strong>{" "}
              {formatNumber(
                userData.find((user) => user.id === selectedBooking.userId)?.point // Hiển thị điểm tích lũy
              )}
            </p>
          </Card>
        ),
      },
      {
        key: "4",
        label: "Thông tin thanh toán",
        children: (
          <Card>
            <p>
              <strong>Tổng số tiền sản phẩm:</strong>{" "}
              {formatCurrency(
                selectedBooking.bookingOrders?.reduce(
                  (total, order) => total + order.amount,
                  0
                ) || 0 // Tính tổng số tiền sản phẩm
              )}
            </p>
            <p>
              <strong>Số tiền thanh toán cho POD: </strong>{" "}
              {formatCurrency(
                paymentData.find(
                  (payment) => payment.bookingId === selectedBooking.id
                )?.amount || 0 // Hiển thị số tiền thanh toán cho POD
              )}
            </p>
            <p>
              <strong>Tổng số tiền phải thanh toán:</strong>{" "}
              {formatCurrency(
                (paymentData.find(
                  (payment) => payment.bookingId === selectedBooking.id
                )?.amount || 0) +
                  (selectedBooking.bookingOrders?.reduce(
                    (total, order) => total + order.amount,
                    0
                  ) || 0) // Tính tổng số tiền phải thanh toán
              )}
            </p>
            <p>
              <strong>Số tiền đã thanh toán:</strong>{" "}
              {formatCurrency(
                (paymentData.find(
                  (payment) => payment.bookingId === selectedBooking.id
                )?.amount || 0) +
                (selectedBooking.bookingOrders?.reduce(
                  (total, order) => 
                    order.status === "Đã thanh toán" ? total + order.amount : total,
                    0
                  ) || 0) // Tính số tiền đã thanh toán
              )}
            </p>
          </Card>
        ),
      },
    ]} />
  ) : null;

 

  // Hàm trả về giao diện chính của component
  return (
    <div className="admin-order-container">
      <div className="user-manage">
        <Title
          style={{
            textAlign: "center",
            fontFamily: "Arial",
            fontSize: 30,
          }}
          level={2}
        >
          Lịch sử đơn hàng 
        </Title>

        <Input
          placeholder="Tìm kiếm theo số điện thoại " // Placeholder cho ô tìm kiếm
          value={searchTerm} // Giá trị ô tìm kiếm
          onChange={handleSearch} // Hàm xử lý khi thay đổi ô tìm kiếm
          style={{ marginBottom: 20, height: "36px" }}
          prefix={<SearchOutlined />} // Biểu tượng tìm kiếm
        />
        <Table
          dataSource={bookingData.sort((a, b) => b.id - a.id)} // Dữ liệu cho bảng đặt chỗ
          columns={userColumns} // Cột dữ liệu cho bảng đặt chỗ
          rowKey="id" // Khóa cho hàng
          pagination={{ pageSize: 5 }} // Cài đặt phân trang
          bordered // Bỏ viền
        />
        
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "1px solid black",
                paddingBottom: "4px",
              }}
            >
              Chi tiết đơn hàng 
            </div>
          }
          visible={isModalVisible} // Trạng thái hiển thị modal
          onCancel={handleCloseModal} // Hàm đóng modal
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Đóng 
            </Button>,
          ]}
          width={1000} // Độ rộng modal
        >
          {modalContent} 
        </Modal>
        
      </div>
    </div>
  );
};

export default OrderHistory; // Xuất component