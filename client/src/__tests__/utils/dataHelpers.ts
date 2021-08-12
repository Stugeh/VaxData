import {
  isSameDay, max, min,
} from 'date-fns';
import { testOrders, spreadOrders } from '../../testConstants';
import {
  getLatestDate,
  getOrdersToDate,
  getOrdersOnDate,
} from '../../utils/dataHelpers';

const DATES = spreadOrders(testOrders)
  .map((order) => order.arrived);

describe('dataHelpers', () => {
  it('getLatestDate', () => {
    const latestDate = getLatestDate(testOrders);
    expect(latestDate).toEqual(max(DATES));
  });

  it('getOrdersToDate', () => {
    const ordersBefore = getOrdersToDate({
      orders: testOrders,
      date: min(DATES),
    });
    const allOrders = getOrdersToDate({
      orders: testOrders,
      date: max(DATES),
    });
    const ordersBeforeArr = spreadOrders(ordersBefore);
    const allOrdersArr = spreadOrders(allOrders);
    expect(ordersBeforeArr.length).toBe(1);
    expect(allOrdersArr.length).toBe(DATES.length);
  });

  it('ordersOnDate', () => {
    const ordersOn = getOrdersOnDate({
      orders: testOrders,
      date: DATES[3],
    });
    const datesToday = DATES.filter((date) => isSameDay(date, DATES[3]));
    const orderArr = spreadOrders(ordersOn);
    expect(orderArr.length).toBe(datesToday.length);
  });
});
