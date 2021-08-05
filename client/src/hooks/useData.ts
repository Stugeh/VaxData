import { useState, useEffect } from 'react';
import {
  Counts, DateAndOrders, Orders, Vaccination,
} from '../types';

import {
  getMainCounts, getOrdersBeforeDate, getOrdersOnDate,
  getVaccinationsOnDate,
} from '../utils/dataHelpers';

const emptyOrders: Orders = {
  SolarBuddhica: [],
  Antiqua: [],
  Zerpfy: [],
};
const emptyCounts: Counts = {
  SolarBuddhica: {
    vaccinations: 0,
    orders: 0,
    doses: 0,
    expired: 0,
  },
  Antiqua: {
    vaccinations: 0,
    orders: 0,
    doses: 0,
    expired: 0,
  },
  Zerpfy: {
    vaccinations: 0,
    orders: 0,
    doses: 0,
    expired: 0,
  },
};

const emptyVaccinations: Vaccination[] = [];

const useData = ({ orders, date }: DateAndOrders) => {
  const [ordersBeforeDate, setOrdersBeforeDate] = useState(emptyOrders);
  const [cumulativeCounts, setCumulativeCounts] = useState(emptyCounts);
  const [ordersOnDate, setOrdersOnDate] = useState(emptyOrders);
  const [countsOnDate, setCountsOnDate] = useState(emptyCounts);
  const [vaccinationsToday, setVaccinationsToday] = useState(emptyVaccinations);
  const dosesToday = vaccinationsToday.length;

  useEffect(() => {
    setOrdersBeforeDate(getOrdersBeforeDate({ orders, date }));
    setCumulativeCounts(getMainCounts(ordersBeforeDate));
    setOrdersOnDate(getOrdersOnDate({ orders, date }));
    setCountsOnDate(getMainCounts(ordersOnDate));
    setVaccinationsToday(getVaccinationsOnDate(orders, date));
  }, [date, orders]);

  // how many vaxes used

  // how many bottles have expired on that day

  // how many vaccines expired before use

  // how many usable vaccines

  // how many vaccines will expire within 4 days
  return {
    ordersBeforeDate,
    cumulativeCounts,
    ordersOnDate,
    countsOnDate,
    dosesToday,
    vaccinationsToday,
  };
};

export default useData;
