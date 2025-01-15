import React from 'react';
import { Card, Descriptions, Tag } from 'antd';
import { formatDate } from '../../Utils/DateFormat';

const OrderInfo = ({ orderDetails, getStatusTag }) => {
  return (
    <Card
      title="Мэдээлэл"
      style={{ marginBottom: "20px" }}
      bodyStyle={{ padding: "15px" }}
      headStyle={{ background: "#1890ff", color: "#fff" }}
    >
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="Захиалгын дугаар">
          {orderDetails.id}
        </Descriptions.Item>
        <Descriptions.Item label="Огноо">
          {formatDate(orderDetails.orderDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Харилцагчийн нэр">
          {orderDetails.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Өнгө">
          {orderDetails.fiberColor}
        </Descriptions.Item>
        <Descriptions.Item label="Түүхий эдийн төрөл">
          {orderDetails.fiberType}
        </Descriptions.Item>
        <Descriptions.Item label="Төлөв">
          {getStatusTag(orderDetails.status)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrderInfo;
