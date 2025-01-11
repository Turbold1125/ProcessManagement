import React from 'react';
import { Tag } from 'antd';
import { formatDate } from '../../Utils/DateFormat';
import { FiberColorMap } from '../../Constants/Constants';


const processTagColors = {
  Будах: "blue",
  Цувих: "orange",
  Холих: "green",
  Ээрэх: "purple",
  Ороох: "cyan",
  Давхарлах: "volcano",
  Мушгих: "gold",
  CREATE: "lime"
};

export const inventoryColumns = (data) => [
  {
    title: 'Агуулахын дугаар',
    dataIndex: 'id',
    key: 'id',
    width: 120
  },
  {
    title: 'Харилцагч',
    dataIndex: 'customerName',
    key: 'customer',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.customerName))).map((customerName) => ({
      text: customerName,
      value: customerName,
    })),
    onFilter: (value, record) => record.customerName.includes(value),
    render: (text) => text || 'N/A',
  },
  {
    title: 'Түүхий эдийн төрөл',
    dataIndex: 'fiberMaterial',
    key: 'fiberMaterial',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.fiberMaterial))).map((fiberMaterial) => ({
      text: fiberMaterial,
      value: fiberMaterial,
    })),
    onFilter: (value, record) => record.fiberMaterial.includes(value),
    render: (text) => text || 'N/A',
  },
  {
    title: 'Өнгө',
    dataIndex: 'fiberColor',
    key: 'fiberColor',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.fiberColor))).map((fiberColor) => ({
      text: fiberColor,
      value: fiberColor,
    })),
    onFilter: (value, record) => record.fiberColor.includes(value),
    render: (fiberColor) => <Tag color={FiberColorMap[fiberColor]}>{fiberColor}</Tag>
  },
  {
    title: 'Төрөл',
    dataIndex: 'fiberType',
    key: 'fiberType',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.fiberType))).map((fiberType) => ({
      text: fiberType,
      value: fiberType,
    })),
    onFilter: (value, record) => record.fiberType.includes(value),
    render: (text) => text || 'N/A',
  },
  // {
  //   title: 'Шуудай/Боббин дугаар',
  //   key: 'baleNum',
  //   render: (text, record) => {
  //     if (record.baleNum) {
  //       return `Шуудай: ${record.baleNum}`;
  //     } else if (record.bobbinNum) {
  //       return `Боббин: ${record.bobbinNum}`;
  //     } else {
  //       return 'N/A';
  //     }
  //   },
  // },
  { title: 'Бохир жин (кг)', dataIndex: 'roughWeight', key: 'roughWeight' },
  // {
  //   title: 'Шуудай/Боббин жин (кг)',
  //   key: 'baleWeight',
  //   render: (text, record) => {
  //     if (record.baleWeight) {
  //       return `Шуудай: ${record.baleWeight} кг`;
  //     } else if (record.bobbinWeight) {
  //       return `Боббин: ${record.bobbinWeight} кг`;
  //     } else {
  //       return 'N/A';
  //     }
  //   },
  // },
  { title: 'Цэвэр жин (кг)', dataIndex: 'conWeight', key: 'conWeight' },
  {
    title: 'Огноо ба цаг',
    dataIndex: 'dateTime',
    key: 'dateTime',
    width: 130,
    render: (text) => formatDate(text),
    sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
  },
];

export const logColumns = (data) => [
  {
    title: 'Бүртгэлийн дугаар',
    dataIndex: 'id',
    key: 'id',
    width: 120
  },
  {
    title: 'Үйлдэл',
    dataIndex: 'action',
    key: 'action',
    render: (action) => (
      <Tag color={processTagColors[action] || "default"}>{action}</Tag>
    ),
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.action))).map((action) => ({
      text: action,
      value: action,
    })),
    onFilter: (value, record) => record.action.includes(value),
  },
  {
    title: 'Харилцагч',
    dataIndex: 'customerName',
    key: 'customer',
    filterSearch: true,
    render: (text) => text || 'N/A',
    filters: Array.from(new Set(data.map((item) => item.customerName))).map((customer) => ({
      text: customer,
      value: customer,
    })),
    onFilter: (value, record) => record.customerName.includes(value),
  },
  {
    title: 'Түүхий эдийн төрөл',
    dataIndex: 'fiberMaterial',
    key: 'fiberMaterial',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.fiberMaterial))).map((fiberMaterial) => ({
      text: fiberMaterial,
      value: fiberMaterial,
    })),
    onFilter: (value, record) => record.fiberMaterial.includes(value),
  },
  {
    title: 'Өнгө',
    dataIndex: 'fiberColor',
    key: 'fiberColor',
    filterSearch: true,
    render: (fiberColor) => (
      <Tag color={FiberColorMap[fiberColor]}>
        {fiberColor}
      </Tag>
    ),
    filters: Array.from(new Set(data.map((item) => item.fiberColor))).map((fiberColor) => ({
      text: fiberColor,
      value: fiberColor,
    })),
    onFilter: (value, record) => record.fiberColor.includes(value),
  },
  {
    title: 'Төрөл',
    dataIndex: 'fiberType',
    key: 'fiberType',
    filterSearch: true,
    filters: Array.from(new Set(data.map((item) => item.fiberType))).map((fiberType) => ({
      text: fiberType,
      value: fiberType,
    })),
    onFilter: (value, record) => record.fiberType.includes(value),
  },
  // {
  //   title: 'Шуудай/Боббин дугаар',
  //   key: 'baleNum',
  //   render: (text, record) => {
  //     if (record.baleNum) {
  //       return `Шуудай: ${record.baleNum}`;
  //     } else if (record.bobbinNum) {
  //       return `Боббин: ${record.bobbinNum}`;
  //     } else {
  //       return 'N/A';
  //     }
  //   },
  // },
  { title: 'Бохир жин (кг)', dataIndex: 'roughWeight', key: 'roughWeight' },
  // {
  //   title: 'Шуудай/Боббин жин (кг)',
  //   key: 'baleWeight',
  //   render: (text, record) => {
  //     if (record.baleWeight) {
  //       return `Шуудай: ${record.baleWeight} кг`;
  //     } else if (record.bobbinWeight) {
  //       return `Боббин: ${record.bobbinWeight} кг`;
  //     } else {
  //       return 'N/A';
  //     }
  //   },
  // },
  { title: 'Цэвэр Жин (кг)', dataIndex: 'conWeight', key: 'conWeight' },
  {
    title: 'Огноо ба цаг',
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 130,
    render: (text) => formatDate(text),
    sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  },
];


export const processLogColumns = [
  {
    title: "Процессын нэр",
    dataIndex: "processName",
    key: "processName",
  },
  {
    title: "Оролтын жин (кг)",
    dataIndex: "inputMaterialWeight",
    key: "inputMaterialWeight",
  },
  {
    title: "Гаралтын жин (кг)",
    dataIndex: "outputMaterialWeight",
    key: "outputMaterialWeight",
  },
  {
    title: "Процесс эхэлсэн цаг",
    dataIndex: "processStartTime",
    key: "processStartTime",
    render: (text) => new Date(text).toLocaleString(),
  },
  {
    title: "Процесс дууссан цаг",
    dataIndex: "processEndTime",
    key: "processEndTime",
    render: (text) => new Date(text).toLocaleString(),
  },
];