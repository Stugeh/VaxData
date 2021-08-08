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
        keys={['consumed', 'expired']}
        index="producer"
      />
      <BarChart
        header="Doses Today"
        data={vaccineCountsToChart(countsOnDate)}
        keys={['used', 'expired']}
        index="producer"
      />
    </div>
  );
};

export default ChartContainer;
