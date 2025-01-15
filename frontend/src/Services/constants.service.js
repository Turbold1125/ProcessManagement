import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const fetchAllFiberColors = async () => {
    const response = await axios.get(`${API_BASE_URL}/fiberColor`);
    return response.data;
};

const fetchAllMaterials = async () => {
    const response = await axios.get(`${API_BASE_URL}/material`);
    return response.data;
}

const fetchAllFiberTypes = async () => {
    const response = await axios.get(`${API_BASE_URL}/fiberType`);
    return response.data;
};

const fetchAllCustomers = async () => {
    const response = await axios.get(`${API_BASE_URL}/customer`);
    return response.data;
}

const fetchAllFactoryProcesses = async () => {
    const response = await axios.get(`${API_BASE_URL}/factoryProcess`);
    return response.data;
}

export const constantsService = {
    fetchAllFiberColors,
    fetchAllMaterials,
    fetchAllFiberTypes,
    fetchAllCustomers,
    fetchAllFactoryProcesses
}