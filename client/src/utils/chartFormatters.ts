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
    expired: counts.SolarBuddhica.expiredDoses,
  },
  {
    producer: 'Antiqua',
    used: counts.Antiqua.vaccinations,
    available: getAvailableDoses(counts.Antiqua),
    expired: counts.Antiqua.expiredDoses,
  },
  {
    producer: 'Zerpfy',
    used: counts.Zerpfy.vaccinations,
    available: getAvailableDoses(counts.Zerpfy),
    expired: counts.Zerpfy.expiredDoses,
  },
  {
    producer: 'total',
    used:
        counts.SolarBuddhica.vaccinations
        + counts.Antiqua.vaccinations
        + counts.Zerpfy.vaccinations,
    available:
        getAvailableDoses(counts.SolarBuddhica)
        + getAvailableDoses(counts.Antiqua)
        + getAvailableDoses(counts.Zerpfy),
    expired:
        counts.SolarBuddhica.expiredDoses
        + counts.Antiqua.expiredDoses
        + counts.Zerpfy.expiredDoses,
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
