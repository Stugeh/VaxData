import { useState, useEffect } from 'react';
import axios from 'axios';

import { Orders } from '../types';
import validateOrders from '../utils/validateOrders';
import { apiUrl } from '../constants';

const initData: Orders = {
  SolarBuddhica: [],
  Zerpfy: [],
  Antiqua: [],
};

const useFetchOrders = () => {
  const [orders, setOrders] = useState<Orders>(initData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get<Orders>(`${apiUrl}`);
        const body = validateOrders(resp.data);
        if (body === null) throw new Error('data failed to validate or was null');
        setOrders(body);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    void fetchData();
  }, []);

  return { orders, error, loading };
};

export default useFetchOrders;
