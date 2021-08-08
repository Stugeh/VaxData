import { ChartData, Counts, ProducerName } from '../types';

const producers = [
  ProducerName.SolarBuddhica,
  ProducerName.Antiqua,
  ProducerName.Zerpfy,
];

const getAvailableDoses = (counts: Counts[keyof Counts]) => (
  counts.doses - counts.expiredDoses - counts.vaccinations
);

const getAvailableOrders = (counts: Counts[keyof Counts]) => (
  counts.orders - counts.expiredOrders - counts.consumedOrders
);

export const vaccineCountsToChart = (counts: Counts): ChartData => {
  const chartData = producers.map((producer) => ({
    producer,
    arrived: counts[producer].arrivedDoses,
    used: counts[producer].vaccinations,
    available: getAvailableDoses(counts[producer]),
    expired: counts[producer].expiredDoses,
    expiring: counts[producer].expiringDoses,
  }));

  const totals = {
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
    expiring:
      counts.SolarBuddhica.expiringDoses
      + counts.Antiqua.expiringDoses
      + counts.Zerpfy.expiringDoses,
    arrived:
      counts.SolarBuddhica.arrivedDoses
      + counts.Antiqua.arrivedDoses
      + counts.Zerpfy.arrivedDoses,
  };

  return [...chartData, totals] as ChartData;
};

export const orderCountsToBarChart = (counts: Counts): ChartData => {
  const chartData = producers.map((producer) => ({
    producer,
    arrived: counts[producer].arrivedOrders,
    available: getAvailableOrders(counts[producer]),
    expired: counts[producer].expiredOrders,
    consumed: counts[producer].consumedOrders,
  }));

  const totals = {
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
    arrived:
      counts.SolarBuddhica.arrivedOrders
      + counts.Antiqua.arrivedOrders
      + counts.Zerpfy.arrivedOrders,
  };

  return [...chartData, totals] as ChartData;
};
