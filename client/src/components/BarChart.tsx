import { ResponsiveBar } from '@nivo/bar';
import { BarChartData } from '../types';

const BarChart = (data: BarChartData, keys: string[], index: string) => (
  <div className="chart">
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={index}
      margin={{
        top: 50, right: 130, bottom: 50, left: 60,
      }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: { index },
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}

    />
  </div>
);

export default BarChart;
