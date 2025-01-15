import React, { useState, useEffect, useContext } from 'react';
import { Table, Input, Row, Col, Select, Button, Card, Typography, Tooltip, Statistic, Tag, message, Space, } from 'antd';
import { SearchOutlined, PlusOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';
import { getAllOrders } from '../routes';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../Components/OrderForm';
import ProcessDetailsModal from '../Components/ProcessDetailModal';
import { StatusColorMap } from '../Constants/Constants';

import { formatDate } from '../Utils/DateFormat';

const { Title, Text } = Typography;
const { Option } = Select;

const STATUS_OPTIONS = [
  { label: 'Бүгд', value: 'All' },
  { label: 'Хийгдэж байгаа', value: 'IN_PROGRESS', color: "bg-green-500" },
  { label: 'Дууссан', value: 'COMPLETED', color: 'green' },
  { label: 'Хүлээгдэж буй', value: 'PENDING', color: 'orange' },
];

const Orders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [processModalVisible, setProcessModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleStatusChange = (value) => setStatusFilter(value);
  const showModal = () => setIsModalVisible(true);
  const handleModalOk = () => setIsModalVisible(false);
  const handleModalCancel = () => setIsModalVisible(false);
  const addOrder = (order) => setOrders([...orders, order]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearchQuery =
      searchQuery === '' ||
      (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearchQuery;
  });

  const columns = [
    {
      title: "Захиалгын дугаар", dataIndex: "id", key: "id", width: 120,
      align: "center",
    },
    {
      title: "Харилцагч", dataIndex: ["customerName"], key: "name",
      align: "center",
    },
    {
      title: "Огноо",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      render: (dateTime) => (dateTime ? formatDate(dateTime) : "-"),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },

    {
      title: "Өнгө", dataIndex: ["fiberColor"], key: "color",
      align: "center", render: (color) => <Tag color="geekblue">{color}</Tag>
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => <Tag color={StatusColorMap[status]}>{status}</Tag>,
    },
    {
      title: "Жин", dataIndex: "weight", key: "weight",
      align: "center",
      render: (text) => `${text} кг`,
    },
    {
      title: "Процесс харах",
      key: "processActions",
      align: "center",
      render: (_, record) => (
        <Tooltip title="Процессын дэлгэрэнгүй">
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => viewOrderProcesses(record.id)}
            className="bg-green-500 hover:bg-green-600 text-white border-none shadow-md transition duration-200 ease-in-out"
          />
        </Tooltip>
      ),
      width: 140,
    },
    {
      title: "Дэлгэрэнгүй",
      key: "orderActions",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/order/${record.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md transition duration-200 ease-in-out"
        >
          Дэлгэрэнгүй
        </Button>
      ),
      width: 150
    }
  ];

  const viewOrderProcesses = (orderId) => {
    setSelectedOrderId(orderId);
    setProcessModalVisible(true);
  };

  const closeProcessModal = () => {
    setSelectedOrderId(null);
    setProcessModalVisible(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <Card
        style={{
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <Title level={2} style={{ color: '#fff', margin: 0 }}>
          Захиалгууд
        </Title>
      </Card>

      {/* Statistics Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Нийт Захиалга" value={orders.length} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Шинэ"
              value={orders.filter((order) => order.status === 'NEW').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Хийгдэж байгаа"
              value={orders.filter((order) => order.status === 'IN_PROGRESS').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Дууссан"
              value={orders.filter((order) => order.status === 'COMPLETED').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card style={{ marginBottom: '20px', borderRadius: '8px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Захиалга ID, нэр, огноо хайх"
              value={searchQuery}
              onChange={handleSearch}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              style={{ width: '100%' }}
              allowClear
            >
              {STATUS_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Tooltip title="Шинэ захиалга үүсгэх">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                  style={{
                    background: 'linear-gradient(90deg, #52c41a, #73d13d)',
                    border: 'none',
                    borderRadius: '6px',
                  }}
                >
                  Шинэ захиалга
                </Button>
              </Tooltip>
              <Tooltip title="Шинэчлэх">
                <Button
                  icon={<SyncOutlined />}
                  onClick={fetchOrders}
                  loading={loading}
                >
                  Шинэчлэх
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Orders Table */}
      <Card style={{ borderRadius: '8px' }}>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 8,
            showTotal: (total) => `Нийт ${total} захиалга`,
          }}
          bordered
          style={{ borderRadius: '8px' }}
        />
      </Card>

      {/* Order Form Modal */}
      <OrderForm
        isModalVisible={isModalVisible}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        addOrder={addOrder}
        loading={loading}
      />

      <ProcessDetailsModal
        visible={processModalVisible}
        orderId={selectedOrderId}
        onClose={closeProcessModal}
      />
    </div>
  );
};

export default Orders;
