import { BarChartData, Counts } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const countsToBarChart = (counts: Counts): BarChartData => ([
  {
    producer: 'SolarBuddhica',
    orders: counts.SolarBuddhica.orders,
    vaccinations: counts.SolarBuddhica.vaccinations,
    doses: counts.SolarBuddhica.doses,
    expired: counts.SolarBuddhica.expired,
  },
  {
    producer: 'Antiqua',
    orders: counts.Antiqua.orders,
    vaccinations: counts.Antiqua.vaccinations,
    doses: counts.Antiqua.doses,
    expired: counts.Antiqua.expired,
  },
  {
    producer: 'Zerpfy',
    orders: counts.Zerpfy.orders,
    vaccinations: counts.Zerpfy.vaccinations,
    doses: counts.Zerpfy.doses,
    expired: counts.Zerpfy.expired,
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
    doses:
      counts.SolarBuddhica.doses
      + counts.Antiqua.doses
      + counts.Zerpfy.doses,
    expired:
      counts.SolarBuddhica.expired
      + counts.Antiqua.expired
      + counts.Zerpfy.expired,
  },
]);
