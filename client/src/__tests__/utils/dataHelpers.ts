import {
  addDays,
  isAfter,
  isBefore,
  isSameDay, max, min,
} from 'date-fns';
import { testOrders, spreadOrders } from '../../testConstants';
import { ProducerName, Counts } from '../../types';
import {
  getLatestDate,
  getOrdersToDate,
  getOrdersOnDate,
  getVaccinationCount,
  getDoseCount,
  getVaccinationsOnDate,
  getExpiredDosesCount,
  getExpiringDoseCount,
  getArrivedDoses,
  getDailyCounts,
} from '../../utils/dataHelpers';

const DATES = spreadOrders(testOrders)
  .map((order) => order.arrived);

const ALL_ORDERS = spreadOrders(testOrders);

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
    const ordersUpToLast = getOrdersToDate({
      orders: testOrders,
      date: max(DATES),
    });
    const ordersBeforeArr = spreadOrders(ordersBefore);
    const allOrdersArr = spreadOrders(ordersUpToLast);
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
    const doseCount = getDoseCount(ALL_ORDERS);
    const doses = ALL_ORDERS.map((o) => o.injections).reduce((a, b) => a + b);
    expect(doseCount).toBe(doses);
  });

  it('getVaccinationsOnDate', () => {
    const vaxes = ALL_ORDERS
      .flatMap((order) => order.vaccinations);
    const date = vaxes[3].injected;
    const vaxesOnDate = getVaccinationsOnDate(ALL_ORDERS, date);
    const comparison = vaxes.filter((o) => isSameDay(o.injected, date));
    expect(vaxesOnDate.length).toBe(comparison.length);
  });

  it('getExpiredDosesCount', () => {
    const futureDate = new Date(3000, 1, 1);
    const expiredFuture = getExpiredDosesCount({
      orders: ALL_ORDERS,
      date: futureDate,
    });

    const pastDate = new Date(2000, 1, 1);
    const expiredPast = getExpiredDosesCount({
      orders: ALL_ORDERS,
      date: pastDate,
    });
    // subtract used vaccinations from the available injections
    const unusedDoses = ALL_ORDERS
      .map((order) => order.injections - order.vaccinations.length)
      .reduce((a, b) => a + b);
    expect(expiredFuture).toBe(unusedDoses);
    expect(expiredPast).toBe(0);
  });

  it('getExpiringDoseCount', () => {
    const date = addDays(ALL_ORDERS[2].arrived, 20);
    const expiringCount = getExpiringDoseCount({ orders: ALL_ORDERS, date });

    const startDate = addDays(date, -30);
    const endDate = addDays(date, -20);

    const expiringOrders = ALL_ORDERS.filter((order) => (
      isAfter(order.arrived, startDate)
      && isBefore(order.arrived, endDate)
    ));
    expect(expiringCount).toBe(expiringOrders.length);
  });

  it('getArrivedDoses', () => {
    const date = ALL_ORDERS[2].arrived;
    const arrivedCount = ALL_ORDERS
      .filter((order) => isSameDay(order.arrived, date))
      .map((order) => order.injections)
      .reduce((a, b) => a + b, 0);
    const doses = getArrivedDoses(ALL_ORDERS, date);
    expect(doses).toBe(arrivedCount);
  });

  it('getDailyCounts', () => {
    const allZero = getDailyCounts({
      orders: testOrders,
      date: new Date(4000, 1, 1),
    });
    const producers = Object.values(ProducerName);
    producers.forEach((producer) => {
      const keys = Object
        .keys(allZero[producer]) as (keyof Counts[ProducerName])[];
      keys.forEach((key) => {
        expect(allZero[producer][key]).toBe(0);
      });
    });
  });
});
