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

export const useMaterials = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/material`);
            const sortedMaterials = response.data.sort((a, b) => a.id - b.id);
            setMaterials(sortedMaterials);
        } catch (error) {
            handleError(error);
        }
    };

    const createMaterial = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/material/create`, values);
            setMaterials((prevMaterials) => {
                const newMaterials = [...prevMaterials, response.data];
                return newMaterials.sort((a, b) => a.id - b.id);
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const updateMaterial = async (id, values) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/material/update/${id}`, values);
            setMaterials((prevMaterials) => {
                const updatedMaterials = prevMaterials.map((material) => 
                    material.id === id ? response.data : material
                );
                return updatedMaterials.sort((a, b) => a.id - b.id);
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteMaterial = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/material/delete/${id}`);
            fetchMaterials();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    return {
        materials,
        fetchMaterials,
        createMaterial,
        updateMaterial,
        deleteMaterial,
    };
};