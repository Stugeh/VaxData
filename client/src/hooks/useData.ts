import { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import {
  Counts, DataOutput, DateAndOrders, Orders,
} from '../types';
import {
  getExpiredDosesCount,
  getExpiredOrdersCount,
  getMainCounts, getOrdersBeforeDate, getOrdersOnDate,
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
    expiredDoses: 0,
    expiredOrders: 0,
    consumedOrders: 0,
  },
  Antiqua: {
    vaccinations: 0,
    orders: 0,
    doses: 0,
    expiredDoses: 0,
    expiredOrders: 0,
    consumedOrders: 0,
  },
  Zerpfy: {
    vaccinations: 0,
    orders: 0,
    doses: 0,
    expiredDoses: 0,
    expiredOrders: 0,
    consumedOrders: 0,
  },
};

const useData = ({ orders, date }: DateAndOrders): DataOutput => {
  const [ordersBeforeDate, setOrdersBeforeDate] = useState(emptyOrders);
  const [cumulativeCounts, setCumulativeCounts] = useState(emptyCounts);
  const [ordersOnDate, setOrdersOnDate] = useState(emptyOrders);
  const [countsOnDate, setCountsOnDate] = useState(emptyCounts);

  useEffect(() => {
    // Order arrays
    const priorOrders = getOrdersBeforeDate({ orders, date });
    const ordersToday = getOrdersOnDate({ orders, date });
    const expiringOrders = getOrdersOnDate({ orders, date: addDays(date, -30) });
    // various counts
    const priorCounts = getMainCounts({ orders: priorOrders, date });
    const countsToday = getMainCounts({ orders: ordersToday, date });

    const producers = Object.keys(expiringOrders) as (keyof Orders)[];
    producers.forEach((producer) => {
      countsToday[producer].expiredDoses = getExpiredDosesCount({
        orders: expiringOrders[producer], date,
      });
      countsToday[producer].expiredOrders = getExpiredOrdersCount({
        orders: expiringOrders[producer], date,
      });
    });

    setOrdersBeforeDate(priorOrders);
    setCumulativeCounts(priorCounts);
    setOrdersOnDate(ordersToday);
    setCountsOnDate(countsToday);
  }, [date, orders]);
  // how many vaxes used

  // how many bottles have expired on that day

  // how many vaccines expired before use

  // how many usable vaccines
  // const test = [
  //   ...orders.Antiqua,
  //   ...orders.SolarBuddhica,
  //   ...orders.Zerpfy,
  // ].map((order) => order.injections);

  // console.log(test.reduce((a, b) => a + b));

  // how many vaccines will expire within 4 days

  return {
    ordersBeforeDate,
    cumulativeCounts,
    ordersOnDate,
    countsOnDate,
  };
};

export default useData;
