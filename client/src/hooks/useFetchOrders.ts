import { useState, useEffect } from 'react';
import axios from 'axios';

import { OrganizedOrders } from '../types';
import validateData from '../utils/validateOrders';
import { apiBaseUrl } from "../constants";


const initData: OrganizedOrders = {
    SolarBuddhica: [],
    Zerpfy: [],
    Antiqua: []
};

const useFetchOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initData);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const resp = await axios.get<OrganizedOrders>(`${apiBaseUrl}orders/`);
                const data = validateData(resp.data);
                setData(data);
                setIsLoading(false);
            } catch (error) {
                setServerError(error);
                setIsLoading(false);
            }
        };
        void fetchData();
    }, []);
    
    return {isLoading, data, serverError};
};

export default useFetchOrders;