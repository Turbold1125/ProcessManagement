import React from 'react';
import { Tag, Input, Checkbox } from 'antd';
import { formatDate } from '../../Utils/DateFormat';

const processTagColors = {
  Будах: "blue",
  Цувих: "orange",
  Холих: "green",
  Ээрэх: "purple",
  Ороох: "cyan",
  Давхарлах: "volcano",
  Мушгих: "gold",
};

const colorMapping = {
  Цэнхэр: "blue",
  Шар: "gold",
  Ногоон: "green",
  Саарал: "gray",
  Улаан: "red",
  Цагаан: "white",
};

export const processColumns = [
  {
    title: "Процессийн нэр",
    dataIndex: "processName",
    key: "processName",
    align: "center",
    render: (processName) => (
      <Tag color={processTagColors[processName] || "default"}>{processName}</Tag>
    ),
  },
  {
    title: "Ажилтан",
    dataIndex: "username",
    key: "username",
    align: "center",
    render: (_, record) => record.username || "N/A",
  },
  {
    title: "Төлөв",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => {
      const color =
        status === "Явагдаж байна"
          ? "blue"
          : status === "Хүлээгдэж байна"
            ? "orange"
            : "green";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Оролтын жин (кг)",
    dataIndex: "inputMaterialWeight",
    key: "inputMaterialWeight",
    align: "center",
  },
  {
    title: "Гаралтын жин (кг)",
    dataIndex: "outputMaterialWeight",
    key: "outputMaterialWeight",
    align: "center",
    render: (weight) => (weight ? `${weight} кг` : "-"),
  },
  {
    title: "Огноо",
    dataIndex: "dateTime",
    key: "dateTime",
    align: "center",
    render: (dateTime) => (dateTime ? formatDate(dateTime) : "-")
  }
];

export const processLogColumns = [
  {
    title: "Процессийн нэр", dataIndex: "processName", key: "processName",
    align: "center",
    render: (processName) => (
      <Tag color={processTagColors[processName] || "default"}>{processName}</Tag>
    ),
  },
  {
    title: "Ажилтан",
    dataIndex: "username",
    key: "username",
    align: "center",
    render: (_, record) => record.username || "N/A",
  },
  {
    title: "Оролтын жин",
    dataIndex: "inputMaterialWeight",
    key: "inputMaterialWeight",
    align: "center",
    render: (text) => `${text} кг`,
  },
  {
    title: "Оролтын материал",
    dataIndex: "inputMaterial",
    key: "inputMaterial",
    align: "center",
    render: (text) => <Tag color="green">{text}</Tag>,
  },
  {
    title: "Оролтын өнгө",
    dataIndex: "inputMaterialColor",
    key: "inputMaterialColor",
    align: "center",
    render: (inputMaterialColor) => (
      <Tag color={colorMapping[inputMaterialColor] || "default"}>{inputMaterialColor}</Tag>
    ),
  },
  {
    title: "Гаралтын жин",
    dataIndex: "outputMaterialWeight",
    key: "outputMaterialWeight",
    align: "center",
    render: (text) => `${text} кг`,
  },
  {
    title: "Гаралтын материал",
    dataIndex: "outputMaterial",
    key: "outputMaterial",
    align: "center",
    render: (text) => <Tag color="green">{text}</Tag>,
  },
  {
    title: "Гаралтын өнгө",
    dataIndex: "outputMaterialColor",
    key: "outputMaterialColor",
    align: "center",
    render: (inputMaterialColor) => (
      <Tag color={colorMapping[inputMaterialColor] || "default"}>{inputMaterialColor}</Tag>
    ),
  },
  {
    title: "Эхэлсэн огноо",
    dataIndex: "processStartTime",
    key: "processStartTime",
    align: "center",
    render: (dateTime) => (dateTime ? formatDate(dateTime) : "-")
  },
  {
    title: "Дууссан огноо",
    dataIndex: "processEndTime",
    key: "processEndTime",
    align: "center",
    render: (dateTime) => (dateTime ? formatDate(dateTime) : "-")
  },
];

export const inventoryColumns = (selectedFibers, setSelectedFibers) => [
  {
    title: "Материал",
    dataIndex: "fiberMaterial",
    key: "fiberMaterial",
    align: "center",
    render: (text) => <Tag color="purple">{text}</Tag>,
  },
  {
    title: "Өнгө",
    dataIndex: "fiberColor",
    key: "fiberColor",
    align: "center",
    render: (fiberColor) => (
      <Tag color={colorMapping[fiberColor] || "default"}>{fiberColor}</Tag>
    ),
  },
  {
    title: "Төрөл",
    dataIndex: "fiberType",
    key: "fiberType",
    align: "center",
  },
  {
    title: "Жин (кг)",
    dataIndex: "conWeight",
    key: "conWeight",
    align: "center",
    render: (text) => `${text} кг`,
  },
  {
    title: 'Шуудай/Боббин дугаар',
    key: 'baleNum',
    render: (text, record) => {
      if (record.baleNum) {
        return `Шуудай: ${record.baleNum}`;
      } else if (record.bobbinNum) {
        return `Боббин: ${record.bobbinNum}`;
      } else {
        return 'N/A';
      }
    },
  },
  {
    title: 'Авах жин (кг)',
    dataIndex: 'conWeight',
    key: 'conWeightInput',
    align: "center",
    render: (text, record) => {
      const selectedFiber = selectedFibers.find((fiber) => fiber.id === record.id);
      return (
        <Input
          type="number"
          min={0}
          max={record.conWeight}
          value={selectedFiber ? selectedFiber.selectedWeight : ""}
          onChange={(e) => {
            const value = e.target.value;
            const updated = { ...record, selectedWeight: value };
            setSelectedFibers((prev) => {
              const existing = prev.find((item) => item.id === record.id);
              if (existing) {
                return prev.map((item) => (item.id === record.id ? updated : item));
              } else {
                return [...prev, updated];
              }
            });
          }}
        />
      );
    },
  },
  {
    title: "Сонгох",
    key: "select",
    render: (_, record) => (
      <Checkbox
        checked={selectedFibers.some((fiber) => fiber.id === record.id)}
        onChange={(e) => {
          const checked = e.target.checked;
          if (checked) {
            setSelectedFibers((prev) => [...prev, { ...record, selectedWeight: record.conWeight }]);
          } else {
            setSelectedFibers((prev) => prev.filter((fiber) => fiber.id !== record.id));
          }
        }}
      />
    ),
  },
]

export const processIOColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: "center",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Процессийн нэр',
    dataIndex: 'processName',
    key: 'processId',
    align: "center",
    sorter: (a, b) => a.processId - b.processId,
  },
  {
    title: 'Материал',
    dataIndex: 'material',
    key: 'material',
    align: "center",
  },
  {
    title: 'Жин (кг)',
    dataIndex: 'weight',
    key: 'weight',
    align: "center",
    sorter: (a, b) => a.weight - b.weight,
  },
  {
    title: 'Өнгө',
    dataIndex: 'color',
    key: 'color',
    align: "center",
    render: (color) => (
      <Tag color={colorMapping[color] || "default"}>{color}</Tag>
    ),
  },
  {
    title: 'Inventory ID',
    dataIndex: 'inventoryId',
    key: 'inventoryId',
    align: "center",
    sorter: (a, b) => a.inventoryId - b.inventoryId,
  },
  {
    title: 'Харилцагчийн нэр',
    dataIndex: 'customerName',
    key: 'customerName',
    align: "center",
  },
  {
    title: 'Огноо',
    dataIndex: 'dateTime',
    key: 'dateTime',
    align: "center",
    // render: (dateTime) =>
    //   dateTime ? new Date(dateTime).toLocaleString() : 'Not Available',
      render: (dateTime) => (dateTime ? formatDate(dateTime) : "-")
  },
  {
    title: 'Захиалгын дугаар',
    dataIndex: 'orderId',
    key: 'orderId',
    align: "center",
    sorter: (a, b) => a.orderId - b.orderId,
  },
];