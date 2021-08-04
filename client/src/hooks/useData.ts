import { DateAndOrders } from '../types';
import { getOrdersBeforeDate } from '../utils/dataHelpers';

const useData = ({ orders, date }: DateAndOrders) => {
  // how many total orders / vaccines

  const ordersBeforeDate = getOrdersBeforeDate({ orders, date });
  // how many arrived on the day

  // how many vaxes used

  // how many orders and vaxes per producer

  // how many bottles have expired on that day

  // how many vaccines expired before use

  // how many usable vaccines

  // how many vaccines will expire within 4 days
  return {
    ordersBeforeDate,
  };
};

export default useData;
