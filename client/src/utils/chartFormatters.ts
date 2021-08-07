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
    used: counts[producer].vaccinations,
    available: getAvailableDoses(counts[producer]),
    expired: counts[producer].expiredDoses,
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
  };

  return [...chartData, totals] as ChartData;
};

export const orderCountsToBarChart = (counts: Counts): ChartData => {
  const chartData = producers.map((producer) => ({
    producer,
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
  };

  return [...chartData, totals] as ChartData;
};
