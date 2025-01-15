import axios from 'axios';
import { handleError } from '../Utils/DateFormat';

const API_BASE_URL = 'http://localhost:8080/api';

const fetchAllDelivered = async () => {
    const response = await axios.get(`${API_BASE_URL}/delivery/delivered`);
    return response.data;
};

const deliverInventory = async (request) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/delivery/deliver-inventory`, request);
        return response.data; 
    } catch (error) {
        handleError(error);
    }
};

export const deliveryService = {
    fetchAllDelivered,
    deliverInventory
}