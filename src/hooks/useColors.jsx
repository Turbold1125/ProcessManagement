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

export const useColors = () => {
    const [fiberColors, setFiberColors] = useState([]);

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/fiberColor`);
            setFiberColors(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const createColor = async (colorData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/fiberColor/create`, colorData);
            fetchColors();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const updateColor = async (id, values) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/fiberColor/update/${id}`, values);
            setFiberColors((prevColors) => {
                const updatedColors = prevColors.map((color) => 
                    color.id === id ? response.data : color
                );
                return updatedColors;
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteColor = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/fiberColor/delete/${id}`);
            fetchColors();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    return {
        fiberColors,
        fetchColors,
        createColor,
        updateColor,
        deleteColor,
    };
};