import {
  isSameDay, max, min,
} from 'date-fns';
import { testOrders, spreadOrders } from '../../testConstants';
import {
  getLatestDate,
  getOrdersToDate,
  getOrdersOnDate,
  getVaccinationCount,
  getDoseCount,
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

  it('getVaccinationCount', () => {
    const vaxes = spreadOrders(testOrders).flatMap((order) => order.vaccinations);
    const vaxCount = getVaccinationCount(spreadOrders(testOrders));
    expect(vaxCount).toBe(vaxes.length);
  });

  it('getDoseCount', () => {
    const allOrders = spreadOrders(testOrders);
    const doseCount = getDoseCount(allOrders);
    const doses = allOrders.map((o) => o.injections).reduce((a, b) => a + b);
    expect(doseCount).toBe(doses);
  });

  it('getVaccinationsOnDate', () => {
    const allOrders = spreadOrders(testOrders);
    const vaxes = allOrders.flatMap((order) => order.vaccinations);
  });
});
