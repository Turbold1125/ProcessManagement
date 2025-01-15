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

export const useFiberTypes = () => {
    const [fiberTypes, setFiberTypes] = useState([]);

    useEffect(() => {
        fetchFiberTypes();
    }, []);

    const fetchFiberTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/fiberType`);
            setFiberTypes(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const createFiberType = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/fiberType/create`, values);
            setFiberTypes((prevTypes) => [...prevTypes, response.data]);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const updateFiberType = async (id, values) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/fiberType/update/${id}`, values);
            setFiberTypes((prevTypes) => {
                const updatedTypes = prevTypes.map((type) => 
                    type.id === id ? response.data : type
                );
                return updatedTypes;
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteFiberType = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/fiberType/delete/${id}`);
            fetchFiberTypes();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    return {
        fiberTypes,
        fetchFiberTypes,
        createFiberType,
        updateFiberType,
        deleteFiberType,
    };
};