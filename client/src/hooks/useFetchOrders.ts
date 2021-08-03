import { useState, useEffect } from 'react';
import axios from 'axios';

import { OrganizedOrders } from '../types';
import validateData from '../utils/validateOrders';
import { apiBaseUrl } from '../constants';

const initData: OrganizedOrders = {
  SolarBuddhica: [],
  Zerpfy: [],
  Antiqua: [],
};

const useFetchOrders = () => {
  const [orders, setOrders] = useState<OrganizedOrders>(initData);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get<OrganizedOrders>(`${apiBaseUrl}orders/`);
        const body = validateData(resp.data);
        setOrders(body);
      } catch (err) {
        setError(err);
      }
    };
    void fetchData();
  }, []);

  return { orders, error };
};

export default useFetchOrders;
