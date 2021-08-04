import { useState, useEffect } from 'react';
import axios from 'axios';

import { Orders } from '../types';
import validateOrders from '../utils/validateOrders';
import { apiBaseUrl } from '../constants';

const initData: Orders = {
  SolarBuddhica: [],
  Zerpfy: [],
  Antiqua: [],
};

const useFetchOrders = () => {
  const [orders, setOrders] = useState<Orders>(initData);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get<Orders>(`${apiBaseUrl}orders/`);
        const body = validateOrders(resp.data);
        if (body === null) throw new Error('data failed to validate or was null');
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
