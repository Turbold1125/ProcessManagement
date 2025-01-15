import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const useOrderDetailss = (orderId) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processLogs, setProcessLogs] = useState([]);
  const [processInputs, setProcessInputs] = useState([]);
  const [processOutputs, setProcessOutputs] = useState([]);

  const [error, setError] = useState(null);

  const fetchOrderById = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/order/${orderId}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError(`Order with ID ${orderId} not found.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  const fetchProcesses = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/order/${orderId}/processes`);
      setProcesses(response.data);
    } catch (err) {
      setError("Failed to fetch processes.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  const fetchProcessLogs = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/processes/log/${orderId}`);
      setProcessLogs(response.data);
    } catch (err) {
      setError("Failed to fetch process logs.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  const fetchProcessInputs = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/processes/processInputs/${orderId}`);
      setProcessInputs(response.data);
    } catch (err) {
      setError("Failed to fetch process inputs.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  const fetchProcessOutputs = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/processes/processOutputs/${orderId}`);
      setProcessOutputs(response.data);
    } catch (err) {
      setError("Failed to fetch process outputs.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
      fetchProcesses();
      fetchProcessLogs();
      fetchProcessInputs(); // Fetch process inputs
      fetchProcessOutputs(); // Fetch process outputs
    }
  }, [orderId, fetchOrderById, fetchProcesses, fetchProcessLogs, fetchProcessInputs, fetchProcessOutputs]);

  return {
    orderDetails,
    processes,
    processLogs,
    loading,
    error,
    fetchOrderById,
    fetchProcesses,
    fetchProcessLogs,

    processInputs, // Return process inputs
    processOutputs, // Return process outputs
    fetchProcessInputs, // Return fetch function for process inputs
    fetchProcessOutputs, // Return fetch function for process outputs
  };
};

export default useOrderDetailss;