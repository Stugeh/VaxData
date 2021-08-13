import { orderCountsToBarChart, vaccineCountsToChart } from '../utils/chartFormatters';
import { DataOutput } from '../types';
import BarChart from './BarChart';

const ChartContainer = ({ data }: {data: DataOutput}) => {
  const { cumulativeCounts, countsOnDate } = data;
  return (
    <div className="chart-container">
      <BarChart
        header="Cumulative Orders"
        data={orderCountsToBarChart(cumulativeCounts)}
        keys={['available', 'consumed', 'expired']}
        index="producer"
      />
      <BarChart
        header="Cumulative doses"
        data={vaccineCountsToChart(cumulativeCounts)}
        keys={['available', 'used', 'expired']}
        index="producer"
      />
      <BarChart
        header="Orders Today"
        data={orderCountsToBarChart(countsOnDate)}
        keys={['arrived', 'expired']}
        index="producer"
      />
      <BarChart
        header="Doses Today"
        data={vaccineCountsToChart(countsOnDate)}
        keys={['used', 'expired', 'arrived']}
        index="producer"
      />
      <BarChart
        header="Doses expiring within 10 days"
        data={vaccineCountsToChart(cumulativeCounts)}
        keys={['expiring']}
        index="producer"
      />
      <div className="chartFiller" />
      <div className="chartFiller" />
      <div className="chartFiller" />
    </div>
  );
};

export default ChartContainer;
