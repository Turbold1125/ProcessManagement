import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


const fetchAllinventory = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory/all`);
  return response.data;
};


const fetchInventoryLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory/logs`);
  return response.data;
};


const createInventory = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/inventory/create`, data);
  return response.data;
};


const searchInventory = async (customerName, fiberMaterial) => {
  const response = await axios.get(`${API_BASE_URL}/inventory/search`, {
    params: { customerName, fiberMaterial },
  });
  return response.data;
};


const filterInventory = async (customer, material, color, fiberType) => {
  const response = await axios.get(`${API_BASE_URL}/inventory/filter`, {
    params: { customer, material, color, fiberType },
  });
  return response.data;
};

export const inventoryService = {
  fetchAllinventory,
  fetchInventoryLogs,
  createInventory,
  searchInventory,
  filterInventory,
};
