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

export const useUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const registerUser = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, values);
            fetchUsers();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const updateUser = async (id, values) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/update/${id}`, values);
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) => 
                    user.id === id ? response.data : user
                );
                return updatedUsers;
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
            fetchUsers();
            return response.data;
        } catch (error) {
            handleError(error);
        }
    };
    
    return {
        users,
        fetchUsers,
        registerUser,
        updateUser,
        deleteUser
    };
};