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

export const useFactoryProcesses = () => {
    const [factoryProcesses, setFactoryProcesses] = useState([]);

    useEffect(() => {
        fetchFactoryProcesses();
    }, []);

    const fetchFactoryProcesses = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/factoryProcess`);
            setFactoryProcesses(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const updateFactoryProcess = async (id, values) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/factoryProcess/update/${id}`, values);
            setFactoryProcesses((prevFactoryProcesses) => {
                const updatedFactoryProcesses = prevFactoryProcesses.map((process) => 
                    process.id === id ? response.data : process
                );
                return updatedFactoryProcesses;
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const createFactoryProcess = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/factoryProcess/create`, values);
            setFactoryProcesses((prevFactoryProcesses) => [...prevFactoryProcesses, response.data]);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteFactoryProcess = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/factoryProcess/delete/${id}`);
            fetchFactoryProcesses();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    return {
        factoryProcesses,
        fetchFactoryProcesses,
        updateFactoryProcess,
        createFactoryProcess,
        deleteFactoryProcess,
    };
};