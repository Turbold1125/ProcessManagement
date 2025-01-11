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

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer`);
      setCustomers(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const createCustomer = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customer/create`, data);
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customer/update/${id}`, data);
      setCustomers((prevCustomers) => {
        const updatedCustomers = prevCustomers.map((process) =>
          process.id === id ? response.data : process
        );
        return updatedCustomers;
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/customer/delete/${id}`);
      fetchCustomers();
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    customers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};