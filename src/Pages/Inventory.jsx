import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, message, Select, Row, Col, Card, Typography, Space, Tag, Tooltip, Progress, Modal, } from 'antd';
import { PlusOutlined, SearchOutlined, ExportOutlined, BarChartOutlined, } from '@ant-design/icons';
import { useMaterials } from '../hooks/useMaterials';
import { useInventory } from '../hooks/useInventory';
import axios from 'axios';
import { inventoryColumns, logColumns } from '../Components/Inventory/Columns';
import ReceiveItemModal from '../Components/Inventory/ReceiveItemModal';
import DeliverItemsModal from '../Components/Inventory/DeliverItemModal';
import DeliveredItemsTable from '../Components/Inventory/DeliveredItemsTable';

const { Option } = Select;
const { Title, Text } = Typography;

const Inventory = () => {
  const { materials } = useMaterials();
  const { inventoryData, logData, createInventory, searchInventory, fetchInventoryData, fetchInventoryLogs } = useInventory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');
  const [totalWeight, setTotalWeight] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isShipModalVisible, setIsShipModalVisible] = useState(false);
  const [baseTotalWeight, setBaseTotalWeight] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [deliveredData, setDeliveredData] = useState([]);

  const handleOpenShipModal = () => {
    setIsShipModalVisible(true);
  };

  const handleCancelShipModal = () => {
    setIsShipModalVisible(false);
  };

  const fetchDeliveredItems = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/delivery/delivered`);
    setDeliveredData(data);
  };

  const handleDeliver = async (request) => {
    console.log("Request sent:", request); 
    try {
      const response = await axios.post("http://localhost:8080/api/delivery/deliver-inventory", request);
      console.log("Response received:", response); 
      const data = response.data;
  
      if (response.status === 200 && data.message) {
      } else {
        message.error("Unexpected response from the server.");
      }
  
      await fetchDeliveredItems();
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        const errorMessage = error.response.data?.message || "Failed to deliver items.";
        message.error(errorMessage);
      } else {
        message.error("Network error or server is unavailable.");
      }
    }
  };

  useEffect(() => {
    const calculateTotalWeight = () => {
      const total = inventoryData.reduce((acc, item) => acc + parseFloat(item.conWeight || 0), 0);
      setTotalWeight(total);
    };
    calculateTotalWeight();
  }, [inventoryData]);

  useEffect(() => {
    fetchDeliveredItems();
  }, []); 

  const handleReceiveItem = async (values) => {
    const requestBody = {
      fiberMaterial: values.fiberMaterial,
      customerName: values.customerName,
      fiberColor: values.fiberColor,
      fiberType: values.fiberType,
      roughWeight: values.roughWeight,
      baleWeight: values.baleWeight,
      bobbinWeight: values.bobbinWeight,
      baleNum: values.baleNum,
      bobbinNum: values.bobbinNum,
    };

    try {
      await createInventory(requestBody);
      message.success('Амжилттай хүлээн авлаа');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Хүлээн авахад алдаа гарлаа');
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSearch = async () => {
    try {
      await searchInventory(searchText, filterType);
      setSearchPerformed(true);
    } catch (error) {
      message.error('Search failed');
    }
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const baseLogDataLength = 100;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
        <Title level={3} className="text-gray-800">
          Агуулах
        </Title>
        <div className="flex space-x-4">
          <Input
            placeholder="Хэрэглэгч хайх"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-lg shadow-sm"
          />
          <Button type="primary" onClick={handleSearch}>
            Хайх
          </Button>
        </div>
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <Text className="text-gray-600">Нийт түүхий эд</Text>
          <Title level={4} className="text-gray-800">
            {inventoryData.length} түүхий эд
          </Title>
          <Progress percent={(100 / inventoryData.length) * 100} status="active" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Text className="text-gray-600">Нийт жин</Text>
          <Title level={4} className="text-gray-800">
            {totalWeight} кг
          </Title>
          <Progress percent={searchPerformed ? (totalWeight / baseTotalWeight) * 100 : 100} status="active" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Text className="text-gray-600">Бүртгэлийн тоо</Text>
          <Title level={4} className="text-gray-800">
            {logData.length}
          </Title>
          <Progress percent={(baseLogDataLength / logData.length) * 100} status="active" />
        </div>
      </div>


      <Card
        className="inventory-card"
        bordered={false}
        style={{
          marginBottom: '20px',
          borderRadius: '8px',
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Хэрэглэгч"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{
                borderRadius: '8px',
                borderColor: '#d9d9d9',
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Материал"
              onChange={(value) => setFilterType(value)}
              style={{
                width: '100%',
                borderRadius: '8px',
              }}
              allowClear
            >
              <Option value="">All</Option>
              {materials.map((fiberMaterial) => (
                <Option key={fiberMaterial.id} value={fiberMaterial.name}>
                  {fiberMaterial.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Tooltip title="Search inventory">
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                  Хайх
                </Button>
              </Tooltip>
              <Tooltip title="Receive new inventory">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleOpenModal}
                  style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
                >
                  Хүлээн авах
                </Button>
              </Tooltip>
              <Tooltip title="Хүлээлгэн өгөх">
                <Button
                  type="primary"
                  icon={<ExportOutlined />}
                  onClick={handleOpenShipModal}
                  style={{ backgroundColor: "#03a9f4", borderColor: "#03a9f4" }}
                >
                  Хүлээлгэн өгөх
                </Button>
              </Tooltip>
              <Tooltip title="Хураангуй">
                <Button
                  type="primary"
                  icon={<BarChartOutlined />}
                  onClick={handleShowSummary}
                  style={{ backgroundColor: '#ff9800', borderColor: '#ff9800' }}
                >
                  Хураангуй
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card
        className="inventory-card"
        bordered={false}
        style={{
          marginBottom: '20px',
          borderRadius: '8px',
        }}
      >
        <Title level={3}>Агуулахад байгаа</Title>
        <Table
          columns={inventoryColumns(inventoryData)}
          dataSource={inventoryData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            defaultPageSize: 5,
          }}
          bordered
          style={{ borderRadius: '8px' }}
          locale={{
            emptyText: searchPerformed ? 'Хайлтын үр дүн олдсонгүй' : 'Агуулах хоосон байна',
          }}
        />
      </Card>

      <Card
        className="inventory-card"
        bordered={false}
        style={{
          marginBottom: '20px',
          borderRadius: '8px',
        }}
      >
        <Title level={3}>Агуулахын түүх</Title>
        <Table
          columns={logColumns(logData)}
          dataSource={logData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            defaultPageSize: 5,
          }}
          bordered
          style={{ borderRadius: '8px' }}
          locale={{
            emptyText: 'Түүхийн өгөгдөл байхгүй байна',
          }}
        />
      </Card>

      <Card
        className="inventory-card"
        bordered={false}
        style={{
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <Title level={3}>Хүлээлгэн өгсөн агуулахын бүртгэл</Title>

        <DeliveredItemsTable deliveredData={deliveredData} />

      </Card>

      <DeliverItemsModal
        visible={isShipModalVisible}
        onCancel={handleCancelShipModal}
        inventories={inventoryData}
        customerName={selectedCustomer}
        onDeliver={handleDeliver}
      />

      <ReceiveItemModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleReceiveItem={handleReceiveItem}
        form={form}
      />

      <Modal
        title="Summary of Inventory"
        visible={showSummary}
        onCancel={handleCloseSummary}
        footer={null}
      >
        <Text>Total Weight: {totalWeight} kg</Text>
        <Progress percent={(totalWeight / 1000) * 100} status="active" />
      </Modal>
    </div>
  );
};

export default Inventory;
