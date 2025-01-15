import React, { useState } from "react";
import { Table, Modal, Button, Tag } from "antd";
import { formatDate } from "../../Utils/DateFormat";

const DeliveredItemsTable = ({ deliveredData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const showModal = (items) => {
    setModalData(items);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData([]);
  };

  const mainColumns = [
    { title: "Дугаар", dataIndex: "id", key: "id" },
    { title: "Хэрэглэгчийн нэр", dataIndex: "customerName", key: "customerName" },
    {
      title: "Огноо",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
      render: (deliveryTime) => (deliveryTime ? formatDate(deliveryTime) : "-")
    },
    {
      title: "Түүхий эд",
      key: "items",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record.items)}>
          Дэлгэрэнгүй
        </Button>
      ),
    },
  ];

  const modalColumns = [
    { title: "Inventory ID", dataIndex: "inventoryId", key: "inventoryId" },
    { title: "Материал", dataIndex: "material", key: "material" },
    { title: "Жин (кг)", dataIndex: "weight", key: "weight" },
    { title: "Өнгө", dataIndex: "fiberColor", key: "fiberColor" },
    {
      title: "Delivered Time",
      dataIndex: "deliveredTime",
      key: "deliveredTime",
      render: (deliveredTime) => new Date(deliveredTime).toLocaleString(),
    },
  ];

  return (
    <div>
      <Table
        columns={mainColumns}
        dataSource={deliveredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
      />

      <Modal
        visible={isModalVisible}
        title="Дэлгэрэнгүй Түүхий Эдийн Мэдээлэл"
        footer={null}
        onCancel={handleCancel}
        width={800}
      >
        <Table
          columns={modalColumns}
          dataSource={modalData}
          pagination={false}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default DeliveredItemsTable;
