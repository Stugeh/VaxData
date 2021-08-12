/* eslint-disable import/prefer-default-export */
import {
  isSameDay, isBefore, addDays, addSeconds, isAfter, max,
} from 'date-fns';
import {
  Counts, DateAndOrders, Orders,
  Order, Vaccination, LooseObjectObject,
} from '../types';

// gets the date of the latest arrival
export const getLatestDate = (data: Orders): Date => {
  if (data.SolarBuddhica.length === 0) return new Date();
  const allOrders = [
    ...data.SolarBuddhica,
    ...data.Antiqua,
    ...data.Zerpfy,
  ];
  const dates = allOrders.map((order) => order.arrived);
  return max(dates);
};

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

// gets orders that arrived on a given date from an array
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
export const getVaccinationsOnDate = (orders: Order[], date: Date): Vaccination[] => {
  const vaccinations = orders.flatMap((order) => order.vaccinations);
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

// gets number of doses that are expiring within 10 days from an Order[].
export const getExpiringDoseCount = ({ orders, date }: { orders: Order[], date: Date }) => {
  // range of days to filter for
  const startDate = addDays(date, -30);
  const endDate = addDays(date, -20);

  const expiringOrders = orders.filter((order) => (
    isAfter(order.arrived, startDate)
    && isBefore(order.arrived, endDate)
  ));
  return expiringOrders
    .map((order) => order.injections - order.vaccinations.length)
    .reduce((a, b) => a + b, 0);
};

const getArrivedDoses = (orders: Order[], date: Date): number => {
  const arrivedOrders = orders.filter((order) => isSameDay(order.arrived, date));
  return arrivedOrders
    .map((order) => order.injections)
    .reduce((a, b) => a + b, 0);
};

export const getDailyCounts = ({ orders, date }: DateAndOrders) => {
  const producers = Object.keys(orders) as (keyof Orders)[];
  const counts: LooseObjectObject = {};
  const ordersToday = getOrdersOnDate({ orders, date });
  const expiringOrders = getOrdersOnDate({ orders, date: addDays(date, -30) });
  producers.forEach((producer) => {
    counts[producer] = {
      arrivedOrders: orders[producer].filter((order) => isSameDay(order.arrived, date)).length,
      arrivedDoses: getArrivedDoses(orders[producer], date),
      orders: ordersToday[producer].length,
      vaccinations: getVaccinationsOnDate(orders[producer], date).length,
      doses: getDoseCount(ordersToday[producer]),
      expiredDoses: getExpiredDosesCount({ orders: expiringOrders[producer], date }),
      expiredOrders: getExpiredOrdersCount({ orders: expiringOrders[producer], date }),
      consumedOrders: getConsumedOrdersCount(orders[producer]),
      expiringDoses: getExpiringDoseCount({ orders: orders[producer], date }),
    };
  });
  // TODO validation for counts objects
  return counts as Counts;
};

// Builds a counter object from a given Order[].
// Date specifies the point before which data is counted.
export const getCumulativeCounts = ({ orders, date }: DateAndOrders): Counts => {
  const producers = Object.keys(orders) as (keyof Orders)[];

  const counts: LooseObjectObject = {};

  producers.forEach((producer) => {
    counts[producer] = {
      arrivedOrders: orders[producer].filter((order) => isSameDay(order.arrived, date)),
      arrivedDoses: getArrivedDoses(orders[producer], date),
      orders: orders[producer].length,
      vaccinations: getVaccinationCount(orders[producer]),
      doses: getDoseCount(orders[producer]),
      expiredDoses: getExpiredDosesCount({ orders: orders[producer], date }),
      expiredOrders: getExpiredOrdersCount({ orders: orders[producer], date }),
      consumedOrders: getConsumedOrdersCount(orders[producer]),
      expiringDoses: getExpiringDoseCount({ orders: orders[producer], date }),
    };
  });
  // TODO validation for counts objects
  return counts as Counts;
};
