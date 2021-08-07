import { orderCountsToBarChart } from '../utils/chartFormatters';
import { DataOutput } from '../types';
import BarChart from './BarChart';

const ChartContainer = ({ data }: {data: DataOutput}) => {
  const { cumulativeCounts } = data;
  return (
    <div className="chart-container">
      <BarChart
        header="Cumulative Orders"
        data={orderCountsToBarChart(cumulativeCounts)}
        keys={['available', 'expired', 'consumed']}
        index="producer"
      />
      <BarChart
        header="Cumulative doses"
        data={orderCountsToBarChart(cumulativeCounts)}
        keys={['used', 'available', 'expired']}
        index="producer"
      />
      <BarChart
        header="Cumulative Orders"
        data={orderCountsToBarChart(cumulativeCounts)}
        keys={['orders']}
        index="producer"
      />
      <BarChart
        header="Cumulative Orders"
        data={orderCountsToBarChart(cumulativeCounts)}
        keys={['orders']}
        index="producer"
      />
    </div>
  );
};

export default ChartContainer;
