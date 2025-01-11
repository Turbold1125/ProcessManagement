import React, { useEffect, useState } from 'react';
import { Typography, Modal, Form, Select, Input, Button, Row, Col, Tabs } from 'antd';
import { useColors } from '../../hooks/useColors';
import { useFiberTypes } from '../../hooks/useFiberTypes';
import { useCustomers } from '../../hooks/useCustomers';
import { useMaterials } from '../../hooks/useMaterials';

const { Option } = Select;

const { Title, Text } = Typography;

const ReceiveItemModal = ({ isModalVisible, handleCancel, handleReceiveItem, form, defaultCustomerName, defaultColor, defaultFiberType}) => {
    const { fiberColors } = useColors();
    const { fiberTypes } = useFiberTypes();
    const { customers } = useCustomers();
    const { materials } = useMaterials();
    const [selectedMaterial, setSelectedMaterial] = useState('');
    
    useEffect(() => {
        if (isModalVisible) {
            // Set default values when the modal is opened
            form.setFieldsValue({
                customerName: defaultCustomerName || undefined,
                fiberColor: defaultColor || undefined,
                fiberType: defaultFiberType || undefined,
            });
        }
    }, [isModalVisible, defaultCustomerName, defaultColor, defaultFiberType, form]);


    return (
        <Modal
            title={<Title level={4} style={{ margin: 0, color: '#333', textAlign: 'center' }}>Түүхий эд хүлээн авах</Title>}
            open={isModalVisible}
            onCancel={handleCancel}
            width={600}
            footer={null}
            bodyStyle={{ padding: '24px 32px', backgroundColor: '#f9f9f9' }}
            centered
        >
            <Form
                form={form}
                onFinish={handleReceiveItem}
                layout="vertical"
                style={{ maxWidth: '100%' }}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="fiberMaterial"
                            label="Түүхий эдийн төрөл"
                            rules={[{ required: true, message: 'Түүхий эдийн төрлийг сонгоно уу!' }]}
                        >
                            <Select
                                placeholder="Түүхий эдийн төрлийг сонгоно уу"
                                onChange={(value) => setSelectedMaterial(value)}
                                style={{ borderRadius: '8px' }}
                            >
                                {materials.map(fiberMaterial => (
                                    <Option key={fiberMaterial.id} value={fiberMaterial.name}>{fiberMaterial.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="customerName"
                            label="Харилцагч"
                            rules={[{ required: true, message: 'Харилцагч сонгоно уу!' }]}
                        >
                            <Select
                                placeholder="Харилцагч сонгоно уу"
                                style={{ borderRadius: '8px' }}
                            >
                                {Array.isArray(customers) && customers.map(customer => (
                                    <Option key={customer.id} value={customer.name}>{customer.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="fiberColor"
                            label="Өнгө"
                            rules={[{ required: true, message: 'Өнгө сонгоно уу!' }]}
                        >
                            <Select
                                placeholder="Өнгө сонгоно уу"
                                style={{ borderRadius: '8px' }}
                            >
                                {Array.isArray(fiberColors) && fiberColors.map(fiberColor => (
                                    <Option key={fiberColor.id} value={fiberColor.name}>{fiberColor.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="fiberType"
                            label="Төрөл"
                            rules={[{ required: true, message: 'Төрөл сонгоно уу!' }]}
                        >
                            <Select
                                placeholder="Төрөл сонгоно уу"
                                style={{ borderRadius: '8px' }}
                            >
                                {Array.isArray(fiberTypes) && fiberTypes.map(type => (
                                    <Option key={type.id} value={type.name}>{type.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="roughWeight"
                            label="Бохир жин (кг)"
                            rules={[{ required: true, message: 'Бохир жинг оруулна уу!' }]}
                        >
                            <Input
                                type="number"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>
                    </Col>
                    {selectedMaterial === 'Түүхий эд' || selectedMaterial === 'Хольсон түүхий эд' ? (
                        <Col span={12}>
                            <Form.Item
                                name="baleWeight"
                                label="Шуудайны жин (кг)"
                                rules={[{ required: true, message: 'Шуудайны жинг оруулна уу!' }]}
                            >
                                <Input
                                    type="number"
                                    style={{ borderRadius: '8px' }}
                                />
                            </Form.Item>
                        </Col>
                    ) : (
                        <>
                            <Col span={12}>
                                <Form.Item
                                    name="bobbinWeight"
                                    label="Бобины жин (кг)"
                                    rules={[{ required: true, message: 'Бобины жинг оруулна уу!' }]}
                                >
                                    <Input
                                        type="number"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="bobbinNum"
                                    label="Бобины дугаар"
                                    rules={[{ required: true, message: 'Бобины дугаарыг оруулна уу!' }]}
                                >
                                    <Input
                                        type="number"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                </Row>
                <Form.Item style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ border: 'none', borderRadius: '8px', padding: '6px 24px' }}
                    >
                        Хадгалах
                    </Button>
                    <Button
                        style={{
                            marginLeft: '12px',
                            borderRadius: '8px',
                            padding: '6px 24px',
                        }}
                        onClick={handleCancel}
                    >
                        Цуцлах
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReceiveItemModal;