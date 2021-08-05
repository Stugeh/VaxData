import { useState, useEffect } from 'react';
import {
  Counts, DataOutput, DateAndOrders, Orders, Vaccination,
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

const useData = ({ orders, date }: DateAndOrders): DataOutput => {
  const [ordersBeforeDate, setOrdersBeforeDate] = useState(emptyOrders);
  const [cumulativeCounts, setCumulativeCounts] = useState(emptyCounts);
  const [ordersOnDate, setOrdersOnDate] = useState(emptyOrders);
  const [countsOnDate, setCountsOnDate] = useState(emptyCounts);
  const [vaccinationsToday, setVaccinationsToday] = useState(emptyVaccinations);
  const dosesToday = vaccinationsToday.length;

  useEffect(() => {
    // Order arrays
    const priorOrders = getOrdersBeforeDate({ orders, date });
    const ordersToday = getOrdersOnDate({ orders, date });
    // various counts
    const priorCounts = getMainCounts(priorOrders);
    const countsToday = getMainCounts(ordersToday);
    const injectionsToday = getVaccinationsOnDate(orders, date);

    setOrdersBeforeDate(priorOrders);
    setCumulativeCounts(priorCounts);
    setOrdersOnDate(ordersToday);
    setCountsOnDate(countsToday);
    setVaccinationsToday(injectionsToday);
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
