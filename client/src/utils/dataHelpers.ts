/* eslint-disable import/prefer-default-export */
import { DateAndOrders, Orders, ProducerName } from '../types';

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

export const getOrdersBeforeDate = ({ date, orders }: DateAndOrders) => {
  const keys = Object.keys(orders) as ProducerName[];
  const filteredOrders = keys.map((key) => (
    orders[key].filter((order) => order.arrived.getTime() < date.getTime())
  ));
  return filteredOrders;
};
