import React from "react";
import { Modal, Table, Input, Select } from "antd";

const { Option } = Select;

export const StartProcessModal = ({ visible, onCancel, onOk, inventoryColumns, selectedFibers, totalInputWeight, }) => (
    <Modal
        title="Процесс эхлүүлэх"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
    >
        <Table
            columns={inventoryColumns}
            dataSource={selectedFibers}
            pagination={false}
            bordered
            size="small"
            rowKey="id"
        />
        <div style={{ marginTop: "10px" }}>
            <strong>Нийт оролтын жин:</strong> {totalInputWeight} кг
        </div>
    </Modal>
);

export const EndProcessModal = ({ orderDetails, visible, onCancel, onOk, outputMaterial, setOutputMaterial, outputWeight, setOutputWeight, outputColor, setOutputColor, fiberColors, wasteData, setWasteData, wastes }) => (
    <Modal
        title="Процесс дуусгах"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
    >
        <div style={{ marginBottom: "16px" }}>
            <label>Гаралтын материал:</label>
            <div
                style={{
                    padding: "8px 12px",
                    background: "#f5f5f5",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    marginTop: "8px",
                }}
            >
                {outputMaterial}
            </div>
        </div>
        <div style={{ marginBottom: "16px" }}>
            <div style={{ marginBottom: "8px" }}>
                <strong>Захиалга дахь өнгө:</strong> {orderDetails.fiberColor || "Өнгө байхгүй"}
            </div>
            <label>Гаралтын өнгө:</label>
            <Select
                style={{ width: "100%" }}
                placeholder="Гаралтын өнгийг сонгоно уу"
                value={outputColor}
                onChange={setOutputColor}
                allowClear
                required
            >
                {fiberColors.map((color) => (
                    <Option key={color.id} value={color.name}>
                        {color.name}
                    </Option>
                ))}
            </Select>
        </div>
        <div>
            <label>Гаралтын жин (кг):</label>
            <Input
                type="number"
                min={0}
                value={outputWeight}
                onChange={(e) => setOutputWeight(e.target.value)}
                placeholder="Гаралтын жин"
            />
        </div>
        <div style={{ marginBottom: "16px" }}>
            <div style={{ marginBottom: "16px" }}>
                <strong>Хаягдлын мэдээлэл:</strong>
                {wastes.length > 0 ? (
                    wastes.map((waste) => (
                        <div key={waste} style={{ marginBottom: "8px" }}>
                            <label>{waste}:</label>
                            <Input
                                type="number"
                                min={0}
                                value={wasteData[waste] || ""}
                                onChange={(e) =>
                                    setWasteData({
                                        ...wasteData,
                                        [waste]: parseFloat(e.target.value) || 0,
                                    })
                                }
                                placeholder={`Хаягдлын жин (${waste})`}
                            />
                        </div>
                    ))
                ) : (
                    <p>Энэ процессд хаягдал байхгүй.</p>
                )}
            </div>
        </div>
    </Modal>
);