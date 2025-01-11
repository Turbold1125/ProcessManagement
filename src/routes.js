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

export const fetchProcessesForOrder = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/order/${orderId}/processes`);
  return response.data; // List of processes
};


export const endProcess = async (endProcessData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/processes/end`, endProcessData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to end process.");
  }
};





export const getOrderProcesses = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/${orderId}/processes`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch processes for order.");
  }
};

/*------------------------------- FACTORY PROCESS ----------------------------- */
export const getFactoryProcesses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/factoryProcess`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateFactoryProcess = async (id, values) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/factoryProcess?id=${id}`, values);
    return response.data;
  } catch (error) {
    console.error("Error updating fiber type", error);
    throw error;
  }
}


/*------------------------------- CUSTOMER ----------------------------- */

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCustomers = async (data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/api/customers`, data);
      return response.data; // Return the created customer data
  } catch (error) {
      throw new Error("Failed to create customer");
  }
};

export const updateCustomers = async (id, data) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/api/customers/${id}`, data);
      return response.data; // Return the updated customer data
  } catch (error) {
      throw new Error("Failed to update customer");
  }
};


export const deleteCustomers = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customer`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



/*------------------------------- COLOR ----------------------------- */


export const createColors = async (colorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fiberColor`, colorData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateColor = async (id, values) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/fiberColor?id=${id}`, values);
    return response.data;
  } catch (error) {
    console.error("Error updating fiber type", error);
    throw error;
  }
};

export const getColors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fiberColor`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteColors = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/fiberColor`, { params: { id }});
    return response.data;
  } catch (error) {
    handleError(error);
  }
}


/*------------------------------- FIBER TYPE ----------------------------- */

export const getFiberTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fiberType`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const updateFiberType = async (id, values) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/fiberType/update/${id}`, values);
    return response.data;
  } catch (error) {
    console.error("Error updating fiber type", error);
    throw error;
  }
};

export const deleteFiberType = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/fiberType/delete/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error deleting fiber type", e);
    throw e;
  }
}

export const createFiberType = async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fiberType/create`, values);
    return response.data;
  } catch (e) {
    console.error("Error creating fiber type", e);
    throw e;
  }
}


/*------------------------------- ORDER ----------------------------- */


export const getRecentOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/recent`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/all`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/order/create`, orderData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



/*------------------------------- FIBER RECEIVE ----------------------------- */


export const getFiberReceivesByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fiber-receive?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createFiberReceive = async (fiberReceiveData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fiber-receive`, fiberReceiveData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



/*------------------------------- USER ----------------------------- */

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/update/${id}`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
