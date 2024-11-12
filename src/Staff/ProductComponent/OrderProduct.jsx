import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  message,
  Popconfirm,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const OrderProduct = () => {
  const apiOrderProduct = "https://localhost:7166/api/BookingOrder";
  const apiProduct = "https://localhost:7166/api/Product";
  const apiBooking = "https://localhost:7166/api/Booking";
  const apiPayment = "https://localhost:7166/api/Payment";

  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [nextBookingOrderId, setNextBookingOrderId] = useState(null);
  const [nextPaymentId, setNextPaymentId] = useState(0);
  const navigate = useNavigate();

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(apiBooking);
      setBookings(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách booking:", error);
      message.error("Không thể lấy danh sách booking");
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiProduct);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      message.error("Không thể lấy danh sách sản phẩm");
    }
  };

  const fetchNextBookingOrderId = async () => {
    try {
      // Fetch cả hai ID song song
      const [bookingOrderResponse, paymentResponse] = await Promise.all([
        axios.get(apiOrderProduct),
        axios.get(apiPayment),
      ]);

      // Xử lý BookingOrder ID
      const bookingOrders = bookingOrderResponse.data;
      const maxBookingOrderId = Math.max(
        ...bookingOrders.map((order) => order.id),
        0
      );
      setNextBookingOrderId(maxBookingOrderId + 1);

      // Xử lý Payment ID
      const payments = paymentResponse.data;
      const maxPaymentId = Math.max(
        ...payments.map((payment) => payment.id),
        0
      );
      setNextPaymentId(maxPaymentId + 1);
    } catch (error) {
      console.error("Lỗi khi lấy ID BookingOrder và Payment tiếp theo:", error);
      message.error("Không thể lấy ID BookingOrder và Payment tiếp theo");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBookingData();
    fetchNextBookingOrderId();
  }, []);

  const validateQuantity = (rule, value) => {
    const productId = form.getFieldValue("productId");
    const selectedProduct = products.find((p) => p.id === productId);

    if (selectedProduct && value > selectedProduct.stock) {
      return Promise.reject(
        new Error(
          `Số lượng không được lớn hơn số lượng có sẵn trong kho. Hiện tại có ${selectedProduct.stock} sản phẩm.`
        )
      );
    }

    return Promise.resolve();
  };
  // điều chỉnh giá theo số lượng
  const handleQuantityChange = (value) => {
    const productId = form.getFieldValue("productId");
    const selectedProduct = products.find((p) => p.id === productId);
    if (selectedProduct) {
      form.setFieldsValue({ amount: selectedProduct.price * value });
    }
  };

  const submitBookingOrder = async (values) => {
    try {
      // Validate the amount
      if (!values.amount || values.amount <= 0) {
        message.error("Số tiền thanh toán không hợp lệ");
        return;
      }

      // Validate the booking
      const booking = bookings.find((b) => b.id === values.bookingId);
      if (!booking || booking.status !== "Đang diễn ra") {
        message.error(
          "Không thể thêm BookingOrder. Booking không hợp lệ hoặc không đang diễn ra."
        );
        return;
      }

      const bookingOrder = {
        ...values,
        id: nextBookingOrderId,
        date: values.date.format("YYYY-MM-DD"),
        status: "Đã thanh toán", // Thiết lập trạng thái cho BookingOrder
      };

      // Gửi request tạo BookingOrder
      await axios.post(apiOrderProduct, bookingOrder);
      message.success("Đã thêm BookingOrder thành công!");

      // Tạo Payment với format đúng và ID mới
      const payment = {
        id: nextPaymentId,
        method: "Chuyển khoản",
        amount: values.amount,
        date: new Date(values.date).toISOString(),
        status: "Đã thanh toán", // Đảm bảo status được thiết lập
        bookingId: values.bookingId,
      };

      // Gửi request tạo Payment với xử lý lỗi chi tiết hơn
      const paymentResponse = await axios.post(apiPayment, payment);
      if (paymentResponse.status === 200 || paymentResponse.status === 201) {
        message.success("Đã tạo thanh toán thành công!");
      }

      // Cập nhật stock của sản phẩm
      const selectedProduct = products.find((p) => p.id === values.productId);
      const updatedStock = selectedProduct.stock - values.quantity;
      await axios.put(`${apiProduct}/${selectedProduct.id}`, {
        ...selectedProduct,
        stock: updatedStock,
      });

      // Chỉ chuyển hướng và reset form nếu cả hai operation đều thành công
      navigate("/history");
      form.resetFields();
      // Fetch lại ID cho lần tiếp theo
      fetchNextBookingOrderId();
    } catch (error) {
      console.error("Lỗi khi thêm BookingOrder:", error);
      message.error("Có lỗi xảy ra khi thêm BookingOrder");
    }
  };
  const handleProductChange = (value) => {
    const selectedProduct = products.find((p) => p.id === value);
    if (selectedProduct) {
      const quantity = form.getFieldValue("quantity") || 1;
      form.setFieldsValue({ amount: selectedProduct.price * quantity });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Hàm để vô hiệu hóa các ngày không phải là hôm nay
  const disabledDate = (currentDay) => {
    const today = moment().startOf("day");
    return currentDay && currentDay.valueOf() !== today.valueOf();
  };
  const initialDate = moment().startOf("day");

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        backgroundColor: "#FAFBFB",
        borderRadius: 10,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        border: "1px solid #e0e0e0",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: 24, fontFamily: "Arial" }}
      >
        <ShoppingCartOutlined /> Order thêm đồ ăn, thức uống
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitBookingOrder}
        initialValues={{ id: nextBookingOrderId }}
      >
        <Form.Item name="id" label="ID BookingOrder" hidden>
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          name="productId"
          label="Sản phẩm"
          rules={[{ required: true }]}
        >
          <Select onChange={handleProductChange}>
            {products
              .filter(
                (product) => product.status !== "Đã hết" && product.stock > 0
              ) // Lọc sản phẩm
              .map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name} - {formatCurrency(product.price)}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng" },
            { validator: validateQuantity }, // Sử dụng hàm xác thực
          ]}
        >
          <InputNumber
            min={1}
            onChange={handleQuantityChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="bookingId"
          label="Booking ID"
          rules={[{ required: true }]}
        >
          <Select>
            {bookings
              .filter((booking) => booking.status === "Đang diễn ra") // Lọc các booking có trạng thái "Đang diễn ra"
              .map((booking) => (
                <Option key={booking.id} value={booking.id}>
                  {`Booking ID: ${booking.id} - Ngày: ${moment(
                    booking.date
                  ).format("DD/MM/YYYY")}`}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày"
          initialValue={initialDate}
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" hidden>
          <Input value="Đã thanh toán"></Input>
        </Form.Item>
        <Form.Item name="amount" label="Tổng tiền">
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) => formatCurrency(value)}
            parser={(value) => value.replace(/[^\d]/g, "")}
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Bạn có chắc chắn muốn thêm BookingOrder này không?"
            onConfirm={() => form.submit()}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faBoxOpen} />}
              block
            >
              Thêm BookingOrder
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderProduct;
