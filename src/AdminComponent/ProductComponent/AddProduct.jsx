import {
  
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import './Product.css';

function AddProduct() {
  const apiProduct = "https://localhost:7166/api/Product";
  const apiStore = "https://localhost:7166/api/Store";
  const apiCategory = "https://localhost:7166/api/Category";
  const [formVariable] = Form.useForm();
  const [store, setStore] = useState([]);
  const [category, setCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [maxProductId, setMaxProductId] = useState(0);
  const navigate = useNavigate();
  const fetchStoreData = async () => {
    const response = await axios.get(apiStore);
    setStore(response.data);
  };
  const fetchCategoryData = async () => {
    const response = await axios.get(apiCategory);
    setCategory(response.data);
  };
  const fetchMaxProductId = async () => {
    try {
      const response = await axios.get(apiProduct);
      const products = response.data;
      const maxId = Math.max(...products.map((p) => p.id), 0);
      setMaxProductId(maxId);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Không thể tải dữ liệu sản phẩm");
    }
  };

  useEffect(() => {
    fetchStoreData();
    fetchCategoryData();
    fetchMaxProductId();
  }, []);

  const handleSubmitValue = async (values) => {
    try {
      setSubmitting(true);
      const productData = { ...values };
      productData.id = maxProductId + 1;
      productData.price = parseFloat(productData.price.replace(/[^\d]/g, ""));

      productData.rating = 5;

      ["stock", "rating", "storeId", "categoryId"].forEach((field) => {
        if (productData[field]) {
          productData[field] = Number(productData[field]);
        }
      });

      const response = await axios.post(apiProduct, productData);
      message.success(`Sản phẩm được thêm thành công với id: ${response.data.id}`);
      navigate("/product"); // Redirect to products list after adding
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data);
      message.error(`Lỗi: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-product-container">
      <div className="add-product-container">
        <Form
          form={formVariable}
          onFinish={handleSubmitValue}
          className="add-product-form"
          initialValues={{ rating: 5 }}
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <Input placeholder="VNĐ" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng trong kho" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="storeId"
            label="Cơ sở"
            rules={[{ required: true, message: "Vui lòng chọn cơ sở" }]}
          >
            <Select>
              {store.map((store) => (
                <Select.Option key={store.id} value={store.id}>
                  {store.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Loại sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select>
              {category.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="back-button">
              <Button
                
                variant="primary"
                type="submit"
              >
                <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to="/product">
                  Trở về
                </Link>
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting} >
                Thêm sản phẩm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
