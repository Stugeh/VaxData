/* eslint-disable import/prefer-default-export */
import { isSameDay, isBefore, addDays } from 'date-fns';
import {
  Counts, DateAndOrders, Orders, ProducerName, Order, Vaccination,
} from '../types';

export const getLatestDate = (data: Orders): Date => {
  // if we don't have data return current date
  if (data.SolarBuddhica.length === 0) return new Date();
  // get all the producer names from the enum so we can loop
  const keys: (keyof typeof ProducerName)[] = Object
    .values(ProducerName);
  // get the latest arrival date of all producers
  // and return them as date objects. (the data is sorted on the backend)
  const firstDates = keys.map((key) => new Date(
    data[key][0].arrived,
  ));
  // sort the combined array and return the most recent date.
  firstDates.sort((a, b) => b.getTime() - a.getTime());
  return firstDates[0];
};

export const ordersBefore = (date: Date, orders: Order[]) => (
  orders.filter((order) => (isBefore(order.arrived, date)))
);

export const ordersOn = (date: Date, orders: Order[]) => (
  orders.filter((order) => (
    isSameDay(order.arrived, date)
  ))
);

export const getOrdersBeforeDate = ({ date, orders }: DateAndOrders) => ({
  SolarBuddhica: ordersBefore(date, orders.SolarBuddhica),
  Antiqua: ordersBefore(date, orders.Antiqua),
  Zerpfy: ordersBefore(date, orders.Zerpfy),
});

export const getOrdersOnDate = ({ date, orders }: DateAndOrders) => ({
  SolarBuddhica: ordersOn(date, orders.SolarBuddhica),
  Antiqua: ordersOn(date, orders.Antiqua),
  Zerpfy: ordersOn(date, orders.Zerpfy),
});

export const getVaccinationCount = (orders: Order[]) => (
  orders.flatMap((order) => order.vaccinations).length
);

export const getDoseCount = (orders: Order[]): number => {
  const nums = orders.map((order) => order.injections);
  return nums.length === 0
    ? 0
    : nums.reduce((acc, val) => acc + val);
};

export const getVaccinationsOnDate = (orders: Orders, date: Date): Vaccination[] => {
  const allData = [
    ...orders.Antiqua,
    ...orders.SolarBuddhica,
    ...orders.Zerpfy,
  ];
  const vaccinations = allData.flatMap((order) => order.vaccinations);
  return vaccinations
    .filter((vax) => isSameDay(vax.injected, date));
};

export const getExpiredOrders = (orders: Order[]) => (
  orders.filter((order) => isBefore(
    addDays(order.arrived, 30),
    new Date(),
  ))
);

export const getConsumedOrdersCount = (orders: Order[]) => (
  orders.filter((order) => (
    order.injections === order.vaccinations.length
  )).length
);

export const getExpiredOrdersCount = (orders: Order[]): number => {
  const expired = getExpiredOrders(orders);
  return expired.length;
};

export const getMainCounts = (orders: Orders): Counts => ({
  Antiqua: {
    orders: orders.Antiqua.length,
    vaccinations: getVaccinationCount(orders.Antiqua),
    doses: getDoseCount(orders.Antiqua),
    expiredDoses: getExpiredDosesCount(orders.Antiqua),
    expiredOrders: getExpiredOrdersCount(orders.Antiqua),
    consumedOrders: getConsumedOrdersCount(orders.Antiqua),
  },
  SolarBuddhica: {
    orders: orders.SolarBuddhica.length,
    vaccinations: getVaccinationCount(orders.SolarBuddhica),
    doses: getDoseCount(orders.SolarBuddhica),
    expiredDoses: getExpiredDosesCount(orders.SolarBuddhica),
    expiredOrders: getExpiredOrdersCount(orders.SolarBuddhica),
    consumedOrders: getConsumedOrdersCount(orders.SolarBuddhica),
  },
  Zerpfy: {
    orders: orders.Zerpfy.length,
    vaccinations: getVaccinationCount(orders.Zerpfy),
    doses: getDoseCount(orders.Zerpfy),
    expiredDoses: getExpiredDosesCount(orders.Zerpfy),
    expiredOrders: getExpiredOrdersCount(orders.Zerpfy),
    consumedOrders: getConsumedOrdersCount(orders.Zerpfy),
  },
});
