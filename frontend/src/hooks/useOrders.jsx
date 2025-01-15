import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const handleError = (error) => {
    console.error('API call error:', error);
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    } else {
        throw new Error('An unexpected error occurred');
    }
};

export const useOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchRecentOrders();
    }, []);
    
    const fetchRecentOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/order/recent`);
            setOrders(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/order/all`);
            const sortedOrders = response.data.sort((a, b) => a.id - b.id);
            setOrders(sortedOrders);
        } catch (error) {
            handleError(error);
        }
    };

    const createOrder = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/orders/create`, values);
            setOrders((prevOrders) => {
                const newOrders = [...prevOrders, response.data];
                return newOrders.sort((a, b) => a.id - b.id);
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/orders/delete/${id}`);
            fetchOrders();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    return {
        orders,
        fetchOrders,
        fetchRecentOrders,
        createOrder,
        deleteOrder,
    };
};