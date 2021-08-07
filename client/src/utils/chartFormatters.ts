import { ChartData, Counts } from '../types';

const getAvailableDoses = (counts: Counts[keyof Counts]) => (
  counts.doses - counts.expiredDoses - counts.vaccinations
);

const getAvailableOrders = (counts: Counts[keyof Counts]) => (
  counts.orders - counts.expiredOrders - counts.consumedOrders
);

export const vaccineCountsToChart = (counts: Counts): ChartData => ([
  {
    producer: 'SolarBuddhica',
    used: counts.SolarBuddhica.vaccinations,
    available: getAvailableDoses(counts.SolarBuddhica),
    expired: counts.SolarBuddhica.expiredOrders,
  },
  {
    producer: 'Antiqua',
    used: counts.Antiqua.vaccinations,
    available: getAvailableDoses(counts.Antiqua),
    expired: counts.Antiqua.expiredOrders,
  },
  {
    producer: 'Zerpfy',
    used: counts.Zerpfy.vaccinations,
    available: getAvailableDoses(counts.Zerpfy),
    expired: counts.Zerpfy.expiredOrders,
  },
  {
    producer: 'total',
    used:
        counts.SolarBuddhica.orders
        + counts.Antiqua.orders
        + counts.Zerpfy.orders,
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

export const orderCountsToBarChart = (counts: Counts): ChartData => ([
  {
    producer: 'SolarBuddhica',
    available: getAvailableOrders(counts.SolarBuddhica),
    expired: counts.SolarBuddhica.expiredOrders,
    consumed: counts.SolarBuddhica.consumedOrders,
  },
  {
    producer: 'Antiqua',
    available: getAvailableOrders(counts.Antiqua),
    expired: counts.Antiqua.expiredOrders,
    consumed: counts.Antiqua.consumedOrders,
  },
  {
    producer: 'Zerpfy',
    available: getAvailableOrders(counts.Zerpfy),
    expired: counts.Zerpfy.expiredOrders,
    consumed: counts.Zerpfy.consumedOrders,
  },
  {
    producer: 'total',
    available:
      getAvailableOrders(counts.Antiqua)
      + getAvailableOrders(counts.SolarBuddhica)
      + getAvailableOrders(counts.Zerpfy),
    expired:
      counts.SolarBuddhica.expiredOrders
      + counts.Antiqua.expiredOrders
      + counts.Zerpfy.expiredOrders,
    consumed:
      counts.Antiqua.consumedOrders
      + counts.SolarBuddhica.consumedOrders
      + counts.Zerpfy.consumedOrders,
  },
]);
