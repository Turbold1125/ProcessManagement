import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm, Row, Col, Card, Typography, Space, Tabs } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, BgColorsOutlined, AppstoreOutlined, UserOutlined, SettingOutlined, TeamOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useFactoryProcesses } from "../hooks/useFactoryProcesses";
import { useCustomers } from "../hooks/useCustomers";
import { useColors } from "../hooks/useColors";
import { useFiberTypes } from "../hooks/useFiberTypes";
import { useMaterials } from "../hooks/useMaterials";
import UserManagement from "../Components/UserManagement";
import styles from "../css/ConstantsManager.module.css"; // Import CSS Module

const { Title } = Typography;
const { TabPane } = Tabs;

const ConstantsManager = () => {
    const { factoryProcesses, createFactoryProcess, updateFactoryProcess, deleteFactoryProcess } = useFactoryProcesses();
    const { customers, createCustomer, updateCustomer, deleteCustomer } = useCustomers();
    const { fiberColors, createColor, updateColor, deleteColor } = useColors();
    const { fiberTypes, createFiberType, updateFiberType, deleteFiberType } = useFiberTypes();
    const { materials, createMaterial, updateMaterial, deleteMaterial } = useMaterials();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentType, setCurrentType] = useState(null);
    const [form] = Form.useForm();

    const openModal = (type, item = null, constantType = null) => {
        setModalType(type);
        setCurrentItem(item);
        setCurrentType(constantType);
        if (type === "update" && item) {
            form.setFieldsValue({
                name: item.name,
                name_en: item.name_en,
                ...(constantType === "factoryProcess" && {
                    inputs: item.inputs,
                    inputs_en: item.inputs_en,
                    outputs: item.outputs,
                    outputs_en: item.outputs_en,
                    description: item.description,
                    waste: item.waste,
                }),
                ...(constantType === "customer" && {
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    fax: item.fax,
                }),
            });
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values) => {
        try {
            if (modalType === "update" && currentItem) {
                const updateFunctions = {
                    fiberColor: updateColor,
                    fiberType: updateFiberType,
                    factoryProcess: updateFactoryProcess,
                    customer: updateCustomer,
                    material: updateMaterial,
                };
                if (!updateFunctions[currentType]) {
                    throw new Error(`No update function found for type: ${currentType}`);
                }
                await updateFunctions[currentType](currentItem.id, values);
                message.success("Амжилттай шинэчиллээ!");
            } else {
                const createFunctions = {
                    fiberColor: createColor,
                    fiberType: createFiberType,
                    factoryProcess: createFactoryProcess,
                    customer: createCustomer,
                    material: createMaterial
                };
                await createFunctions[currentType](values);
                message.success("Амжилттай нэмэгдлээ!");
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            const deleteFunctions = {
                fiberColor: deleteColor,
                fiberType: deleteFiberType,
                factoryProcess: deleteFactoryProcess,
                customer: deleteCustomer,
                material: deleteMaterial
            };
            await deleteFunctions[type](id);
            message.success("Амжилттай устгалаа!");
        } catch (error) {
            message.error("Устгах үйлдэл амжилтгүй боллоо");
        }
    };

    const renderFormFields = () => {
        const commonFields = (
            <Card style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Нэр" rules={[{ required: true, message: "Нэр оруулна уу!" }]}>
                            <Input placeholder="Нэр оруулна уу" style={{ borderRadius: 8 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {currentType !== "customer" && (
                            <Form.Item name="name_en" label="Нэр (англи)">
                                <Input placeholder="Нэр (англи) оруулна уу" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        )}
                    </Col>
                </Row>
            </Card>
        );

        if (currentType === "customer") {
            return (
                <>
                    {commonFields}
                    <Card title="Харилцагчийн мэдээлэл" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email оруулна уу!" }]}>
                                    <Input placeholder="Email оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="phoneNumber" label="Дугаар" rules={[{ required: true, message: "Утасны дугаар оруулна уу!" }]}>
                                    <Input placeholder="Утасны дугаар оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="address" label="Хаяг" rules={[{ required: true, message: "Хаяг оруулна уу!" }]}>
                                    <Input placeholder="Хаяг оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="fax" label="Факс">
                                    <Input placeholder="Факс оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </>
            );
        }

        if (currentType === "factoryProcess") {
            return (
                <>
                    {commonFields}
                    <Card title="Үйлдвэрийн процесс" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="inputs" label="Оролт" rules={[{ required: true, message: "Оролтын бүтээгдэхүүн оруулна уу!" }]}>
                                    <Input placeholder="Оролт оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>

                                <Form.Item name="inputs_en" label="Оролт (англи)" rules={[{ required: true, message: "Оролтын бүтээгдэхүүн оруулна уу!" }]}>
                                    <Input placeholder="Оролтын (англи) оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="outputs" label="Гаралт" rules={[{ required: true, message: "Гаралтын бүтээгдэхүүн оруулна уу!" }]}>
                                    <Input placeholder="Гаралт оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                                <Form.Item name="outputs_en" label="Гаралт (англи)">
                                    <Input placeholder="Гаралт (англи) оруулна уу" style={{ borderRadius: 8 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="description" label="Тайлбар">
                            <Input.TextArea placeholder="Тайлбар оруулна уу" style={{ borderRadius: 8 }} rows={4} />
                        </Form.Item>
                        <Form.Item name="waste" label="Хаягдал">
                            <Input.TextArea placeholder="Хаягдал оруулна уу" style={{ borderRadius: 8 }} rows={4} />
                        </Form.Item>
                    </Card>
                </>
            );
        }

        return commonFields;
    };

    const renderTableCard = (title, columns, dataSource, type) => (
        <Card className={styles.card} style={{ height: '100%' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Title level={3}>{title}</Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal("create", { type }, type)}>
                        {title} үүсгэх
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={dataSource} rowKey="id" pagination={{ pageSize: 7 }} />
        </Card>
    );

    const renderColumns = (type) => {
        const commonColumns = [
            { title: "Нэр", dataIndex: "name", key: "name", align: "center", }
        ];

        if (type !== "customer") {
            commonColumns.push(
                { title: "Нэр (англи)", dataIndex: "name_en", key: "name_en", align: "center", });
        }

        const specificColumns = {
            factoryProcess: [
                { title: "Оролтын бүтээгдэхүүн", dataIndex: "inputs", key: "inputs", align: "center", },
                // { title: "Оролтын бүтээгдэхүүн  (англи)", dataIndex: "inputs_en", key: "inputs_en" },
                { title: "Гаралтын бүтээгдэхүүн", dataIndex: "outputs", key: "outputs", align: "center", },
                // { title: "Гаралтын бүтээгдэхүүн (англи)", dataIndex: "outputs_en", key: "outputs_en" },
                // { title: "Тайлбар", dataIndex: "description", key: "description", align: "center", },
                { title: "Хаягдал", dataIndex: "waste", key: "waste", align: "center", },
            ],
            customer: [
                { title: "Email", dataIndex: "email", key: "email" },
                { title: "Дугаар", dataIndex: "phoneNumber", key: "phoneNumber" },
                { title: "Хаяг", dataIndex: "address", key: "address" },
                { title: "Факс", dataIndex: "fax", key: "fax" },
            ],
        };

        return [
            ...commonColumns,
            ...(specificColumns[type] || []),
            {
                title: "Үйлдлүүд",
                key: "action",
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="link" icon={<EditOutlined />} onClick={() => openModal("update", record, type)}>
                            Засварлах
                        </Button>
                        <Popconfirm title="Та үүнийг устгах гэж байна уу?" onConfirm={() => handleDelete(record.id, type)} okText="Тийм" cancelText="Үгүй">
                            <Button type="link" danger icon={<DeleteOutlined />}>
                                Устгах
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
    };

    return (
        <div className={styles.constantsManager}>
            <Tabs defaultActiveKey="1" centered>

                <TabPane tab={<span><UserSwitchOutlined />Хэрэглэгч</span>} key="1">
                    <UserManagement />
                </TabPane>

                <Space size={5}></Space>

                <TabPane tab={<span><BgColorsOutlined />Өнгө</span>} key="2">
                    {renderTableCard("Өнгө", renderColumns("fiberColor"), fiberColors, "fiberColor")}
                </TabPane>

                <Space size={5}></Space>

                <TabPane tab={<span><AppstoreOutlined />Материал</span>} key="3">
                    {renderTableCard("Материал", renderColumns("material"), materials, "material")}
                </TabPane>

                <Space size={5}></Space>

                <TabPane tab={<span><UserOutlined />Төрөл</span>} key="4">
                    {renderTableCard("Төрөл", renderColumns("fiberType"), fiberTypes, "fiberType")}
                </TabPane>

                <Space size={5}></Space>

                <TabPane tab={<span><SettingOutlined />Процесс</span>} key="5">
                    {renderTableCard("Процесс", renderColumns("factoryProcess"), factoryProcesses, "factoryProcess")}
                </TabPane>

                <Space size={5}></Space>

                <TabPane tab={<span><TeamOutlined />Харилцагч</span>} key="6">
                    {renderTableCard("Харилцагч", renderColumns("customer"), customers, "customer")}
                </TabPane>

            </Tabs>

            <Modal title={modalType === "create" ? "Шинэ нэмэх" : "Засварлах"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                    {renderFormFields()}
                    <Form.Item>
                        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit" style={{ borderRadius: 8 }}>
                                {modalType === "create" ? "Нэмэх" : "Шинэчлэх"}
                            </Button>
                            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                                Цуцлах
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ConstantsManager;