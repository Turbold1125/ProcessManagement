import React from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Header = ({ orderId, navigate }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Button
        icon={<LeftOutlined />}
        type="link"
        onClick={() => navigate(`/order/${parseInt(orderId) - 1}`)}
      >
        Өмнөх
      </Button>
      <Title level={3} style={{ margin: 0 }}>
        Захиалгын дэлгэрэнгүй: {orderId}
      </Title>
      <Button
        icon={<RightOutlined />}
        type="link"
        onClick={() => navigate(`/order/${parseInt(orderId) + 1}`)}
      >
        Дараах
      </Button>
    </div>
  );
};

export default Header;
