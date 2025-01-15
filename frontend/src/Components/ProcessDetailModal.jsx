import React, { useState, useEffect } from "react";
import { Modal, Table, Spin, message, Tag } from "antd";
import { getOrderProcesses } from "../routes";

const ProcessDetailsModal = ({ visible, orderId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    if (visible && orderId) {
      fetchProcesses(orderId);
    }
  }, [visible, orderId]);

  const fetchProcesses = async (orderId) => {
    setLoading(true);
    try {
      const data = await getOrderProcesses(orderId);
      setProcesses(data);
    } catch (error) {
      message.error("Failed to fetch processes.");
    } finally {
      setLoading(false);
    }
  };

  const processColumns = [
    {
      title: "Процессийн нэр",
      dataIndex: "processName",
      key: "processName",
      align: "center",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Ажилтан",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => <Tag color={status === "COMPLETED" ? "green" : "blue"}>{status}</Tag>,
    },
    {
      title: "Эхэлсэн огноо",
      dataIndex: "dateTime",
      key: "dateTime",
      align: "center",
      render: (dateTime) => (dateTime ? new Date(dateTime).toLocaleString() : "-"),
    },
    {
      title: "Оролтын жин",
      dataIndex: "inputMaterialWeight",
      key: "inputMaterialWeight",
      align: "center",
      render: (weight) => (weight ? `${weight} кг` : "-"),
    },
    {
      title: "Гаралтын жин",
      dataIndex: "outputMaterialWeight",
      key: "outputMaterialWeight",
      align: "center",
      render: (weight) => (weight ? `${weight} кг` : "-"),
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Процессийн дэлгэрэнгүй"
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={processColumns}
          dataSource={processes}
          rowKey="id"
          pagination={false}
        />
      )}
    </Modal>
  );
};

export default ProcessDetailsModal;
