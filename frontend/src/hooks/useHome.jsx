import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const useHomeData = (userId) => {
  const [orders, setOrders] = useState([]);
  const [availableProcesses, setAvailableProcesses] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [latestLogs, setLatestLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchHomeData();
    }
  }, [userId]);

  const fetchHomeData = async () => {
    try {
      const [logsResponse, tasksResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/processes/latest/logs`),
        axios.get(`${API_BASE_URL}/processes/tasks/${userId}`),
      ]);

      setLatestLogs(logsResponse.data);
      setMyJobs(tasksResponse.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch home data');
      setLoading(false);
    }
  };

  return {
    myJobs,
    latestLogs,
    loading,
    error,
  };
};