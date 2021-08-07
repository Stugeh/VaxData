/* eslint-disable import/prefer-default-export */
import {
  isSameDay, isBefore, addDays, addSeconds,
} from 'date-fns';
import {
  Counts, DateAndOrders, Orders, ProducerName,
  Order, Vaccination,
} from '../types';

// gets the date of the latest arrival
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

// gets orders arrived on given date

// gets orders before given date from an array
export const ordersBefore = (date: Date, orders: Order[]) => (
  orders.filter((order) => (isBefore(order.arrived, addSeconds(date, 1))))
);

// populates the Orders objects order arrays with
// all orders that arrived before a given date
export const getOrdersBeforeDate = ({ date, orders }: DateAndOrders) => ({
  SolarBuddhica: ordersBefore(date, orders.SolarBuddhica),
  Antiqua: ordersBefore(date, orders.Antiqua),
  Zerpfy: ordersBefore(date, orders.Zerpfy),
});

// gets orders on a given date from an array
export const ordersOn = (date: Date, orders: Order[]) => (
  orders.filter((order) => (
    isSameDay(order.arrived, date)
  ))
);

// populates the Orders objects order arrays with
// all orders that arrived on a given date
export const getOrdersOnDate = ({ date, orders }: DateAndOrders) => ({
  SolarBuddhica: ordersOn(date, orders.SolarBuddhica),
  Antiqua: ordersOn(date, orders.Antiqua),
  Zerpfy: ordersOn(date, orders.Zerpfy),
});

// gets the amount of given vaccinations in an Order[]
export const getVaccinationCount = (orders: Order[]) => (
  orders.flatMap((order) => order.vaccinations).length
);

// Gets the total amount of doses in an Order[]
export const getDoseCount = (orders: Order[]): number => {
  const nums = orders.map((order) => order.injections);
  return nums.length === 0
    ? 0
    : nums.reduce((acc, val) => acc + val);
};

// gets all injections given on a date
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

// counts how many bottles have been completely consumed in an Order[]
export const getConsumedOrdersCount = (orders: Order[]) => (
  orders.filter((order) => (
    order.injections === order.vaccinations.length
  )).length
);

// gets a list of all expired orders
export const getExpiredOrders = ({ orders, date }: {orders: Order[], date: Date}) => (
  orders.filter((order) => isBefore(addDays(order.arrived, 30), date))
);

// returns the amount of expired orders from an Order[]
export const getExpiredOrdersCount = ({ orders, date }: {orders: Order[], date: Date}): number => {
  const expired = getExpiredOrders({ orders, date });
  return expired.length;
};

// Returns number of expired orders
export const getExpiredDosesCount = ({ orders, date }: {orders: Order[], date: Date}): number => {
  const expiredOrders = getExpiredOrders({ orders, date });
  const expiredDoseCounts = expiredOrders.map((order) => (
    order.injections - order.vaccinations.length
  ));
  if (expiredDoseCounts.length === 0) return 0;
  return expiredDoseCounts.reduce((sum, current) => sum + current);
};

// Builds a counter object from a given Order[].
// Date specifies the point before which data is counted.
export const getMainCounts = ({ orders, date }: DateAndOrders): Counts => ({
  Antiqua: {
    orders: orders.Antiqua.length,
    vaccinations: getVaccinationCount(orders.Antiqua),
    doses: getDoseCount(orders.Antiqua),
    expiredDoses: getExpiredDosesCount({ orders: orders.Antiqua, date }),
    expiredOrders: getExpiredOrdersCount({ orders: orders.Antiqua, date }),
    consumedOrders: getConsumedOrdersCount(orders.Antiqua),
  },
  SolarBuddhica: {
    orders: orders.SolarBuddhica.length,
    vaccinations: getVaccinationCount(orders.SolarBuddhica),
    doses: getDoseCount(orders.SolarBuddhica),
    expiredDoses: getExpiredDosesCount({ orders: orders.SolarBuddhica, date }),
    expiredOrders: getExpiredOrdersCount({ orders: orders.SolarBuddhica, date }),
    consumedOrders: getConsumedOrdersCount(orders.SolarBuddhica),
  },
  Zerpfy: {
    orders: orders.Zerpfy.length,
    vaccinations: getVaccinationCount(orders.Zerpfy),
    doses: getDoseCount(orders.Zerpfy),
    expiredDoses: getExpiredDosesCount({ orders: orders.Zerpfy, date }),
    expiredOrders: getExpiredOrdersCount({ orders: orders.Zerpfy, date }),
    consumedOrders: getConsumedOrdersCount(orders.Zerpfy),
  },
});
