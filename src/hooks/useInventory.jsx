import { useState, useEffect, useCallback } from 'react';
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

export const useInventory = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [logData, setLogData] = useState([]);

    const fetchInventoryData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventories/all`);
            setInventoryData(response.data);
        } catch (error) {
            handleError(error);
        }
    }, []);

    const fetchInventoryLogs = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventories/logs`);
            setLogData(response.data);
        } catch (error) {
            handleError(error);
        }
    }, []);

    const createInventory = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/inventories/create`, data);
            // setInventoryData((prevInventory) => [...prevInventory, response.data]);
            await fetchInventoryData();
            await fetchInventoryLogs();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const searchInventory = async (customerName, fiberMaterial) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventories/search`, {
                params: { customerName, fiberMaterial },
            });
            setInventoryData(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };
    
    const filterInventory = async (customer, material, color, fiberType) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventory/filter`, {
                params: { customer, material, color, fiberType },
            });
            setInventoryData(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            await fetchInventoryData();
            await fetchInventoryLogs();
          } catch (error) {
            handleError(error, 'Error fetching initial data');
          }
        };
        fetchData();
      }, [fetchInventoryData, fetchInventoryLogs]);

    return {
        inventoryData,
        logData,
        createInventory,
        searchInventory,
        filterInventory
    };
};