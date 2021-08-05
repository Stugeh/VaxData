import { countsToBarChart } from '../utils/chartFormatters';
import { DataOutput } from '../types';
import BarChart from './BarChart';

const ChartContainer = ({ data }: {data: DataOutput}) => {
  const { cumulativeCounts } = data;
  return (
    <div className="chart-container">
      <BarChart
        header="Cumulative Orders"
        data={countsToBarChart(cumulativeCounts)}
        keys={['orders']}
        index="producer"
      />
    </div>
  );
};

export default ChartContainer;
