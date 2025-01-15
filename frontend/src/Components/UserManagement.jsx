import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Select, Card, Row, Col, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUsers } from '../hooks/useUsers';

const { Option } = Select;
const { Title } = Typography;

const UserManagement = () => {
  const { users, registerUser, updateUser, deleteUser } = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const handleRegisterUser = async (values) => {
    try {
      await registerUser(values);
      message.success('Хэрэглэгч амжилттай бүртгэгдлээ');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Хэрэглэгч бүртгэхэд алдаа гарлаа');
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      await updateUser(currentUser.id, values);
      message.success('Хэрэглэгч амжилттай шинэчлэгдлээ');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Хэрэглэгч шинэчлэхэд алдаа гарлаа');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success('Хэрэглэгч амжилттай устгагдлаа');
    } catch (error) {
      message.error('Хэрэглэгч устгахад алдаа гарлаа');
    }
  };

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsEditMode(!!user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: 'И-мэйл', dataIndex: 'email', key: 'email' },
    { title: 'Нэр', dataIndex: 'username', key: 'username' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Үйлдлүүд',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleOpenModal(record)}>
            Засварлах
          </Button>
          <Popconfirm title="Та үүнийг устгах гэж байна уу?" onConfirm={() => handleDeleteUser(record.id)} okText="Тийм" cancelText="Үгүй">
            <Button type="link" icon={<DeleteOutlined />} danger>
              Устгах
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>Хэрэглэгч</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => handleOpenModal()}>Үүсгэх</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 5 }} />
      <Modal
        title={isEditMode ? 'Хэрэглэгч засварлах' : 'Хэрэглэгч бүртгэх'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={isEditMode ? handleUpdateUser : handleRegisterUser} layout="vertical">
          <Form.Item
            name="email"
            label="И-мэйл"
            rules={[{ required: true, message: 'И-мэйл оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Нэр"
            rules={[{ required: true, message: 'Нэр оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Нууц үг"
            rules={[{ required: true, message: 'Нууц үг оруулна уу!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Role сонгоно уу!' }]}
          >
            <Select placeholder="Role сонгоно уу">
              <Option value="USER">USER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Шинэчлэх' : 'Бүртгэх'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserManagement;