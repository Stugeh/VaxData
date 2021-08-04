/* eslint-disable import/prefer-default-export */
import {
  Counts, DateAndOrders, Orders, ProducerName, Order,
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
  orders.filter((order) => (
    order.arrived.getTime() < date.getTime()
  ))
);

export const getOrdersBeforeDate = ({ date, orders }: DateAndOrders) => ({
  SolarBuddhica: ordersBefore(date, orders.SolarBuddhica),
  Antiqua: ordersBefore(date, orders.Antiqua),
  Zerpfy: ordersBefore(date, orders.Zerpfy),
});

export const getMainCounts = (orders: Orders): Counts => ({
  Antiqua: {
    orders: orders.Antiqua.length,
    vaccines: orders.Antiqua
      .flatMap((order) => order.vaccinations).length,
  },
  SolarBuddhica: {
    orders: orders.SolarBuddhica.length,
    vaccines: orders.SolarBuddhica
      .flatMap((order) => order.vaccinations).length,
  },
  Zerpfy: {
    orders: orders.Zerpfy.length,
    vaccines: orders.Zerpfy
      .flatMap((order) => order.vaccinations).length,
  },
});
