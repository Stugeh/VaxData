import { BarChartData, Counts } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const countsToBarChart = (counts: Counts): BarChartData => ([
  {
    producer: 'SolarBuddhica',
    orders: counts.SolarBuddhica.orders,
    vaccinations: counts.SolarBuddhica.vaccinations,
    available:
      counts.SolarBuddhica.doses
      - counts.SolarBuddhica.expiredOrders
      - counts.SolarBuddhica.vaccinations,
    expired: counts.SolarBuddhica.expiredOrders,
  },
  {
    producer: 'Antiqua',
    orders: counts.Antiqua.orders,
    vaccinations: counts.Antiqua.vaccinations,
    available:
      counts.Antiqua.doses
      - counts.Antiqua.expiredOrders
      - counts.Antiqua.vaccinations,
    expired: counts.Antiqua.expiredOrders,
  },
  {
    producer: 'Zerpfy',
    orders: counts.Zerpfy.orders,
    vaccinations: counts.Zerpfy.vaccinations,
    available:
      counts.Zerpfy.doses
      - counts.Zerpfy.expiredOrders
      - counts.Zerpfy.vaccinations,
    expired: counts.Zerpfy.expiredOrders,
  },
  {
    producer: 'total',
    orders:
      counts.SolarBuddhica.orders
      + counts.Antiqua.orders
      + counts.Zerpfy.orders,
    vaccinations:
      counts.SolarBuddhica.vaccinations
      + counts.Antiqua.vaccinations
      + counts.Zerpfy.vaccinations,
    available:
      counts.SolarBuddhica.doses
      + counts.Antiqua.doses
      + counts.Zerpfy.doses
      - counts.Zerpfy.expiredOrders
      - counts.Zerpfy.vaccinations
      - counts.Antiqua.expiredOrders
      - counts.Antiqua.vaccinations
      - counts.SolarBuddhica.expiredOrders
      - counts.SolarBuddhica.vaccinations,
    expired:
      counts.SolarBuddhica.expiredOrders
      + counts.Antiqua.expiredOrders
      + counts.Zerpfy.expiredOrders,
  },
]);
