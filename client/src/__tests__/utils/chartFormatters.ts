import {
  vaccineCountsToChart,
  orderCountsToBarChart,
} from '../../utils/chartFormatters';

import { testCounts } from '../../testConstants';
import { ChartObject } from '../../types';

describe('Chart Formatters', () => {
  it('vaccineCountsToChart', () => {
    const chartData = vaccineCountsToChart(testCounts);
    const withoutTotal = chartData.filter((object) => (
      object.producer !== 'total'
    ));
    const totals = chartData.find((object) => (
      object.producer === 'total'
    ));
    expect(totals).toBeDefined();
    expect(totals?.arrived).not.toBe(0);
    Object.keys(totals as ChartObject).forEach((key) => {
      if (key !== 'producer') {
        let count = 0;
        withoutTotal.forEach((object) => {
          if (typeof object[key] === 'number') {
            count += object[key] as number;
          }
        });
        expect(count).toBe(totals ? totals[key] : null);
      }
    });
  });

  it('orderCountsToBarChart', () => {
    const chartData = orderCountsToBarChart(testCounts);
    const withoutTotal = chartData.filter((object) => (
      object.producer !== 'total'
    ));
    const totals = chartData.find((object) => (
      object.producer === 'total'
    ));
    expect(totals).toBeDefined();
    expect(totals?.arrived).not.toBe(0);
    Object.keys(totals as ChartObject).forEach((key) => {
      if (key !== 'producer') {
        let count = 0;
        withoutTotal.forEach((object) => {
          if (typeof object[key] === 'number') {
            count += object[key] as number;
          }
        });
        expect(count).toBe(totals ? totals[key] : null);
      }
    });
  });
});
