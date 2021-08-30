import { ResponsiveBar } from '@nivo/bar';
import { Card, Typography, CircularProgress } from '@material-ui/core';
import { ChartData } from '../types';

type ChartInput = {
  data: ChartData,
  keys: string[],
  index: string,
  header: string,
  loading: boolean
}

const BarChart = ({
  data, keys, index, header, loading,
}:ChartInput) => (
  <Card className="chart">
    <Typography variant="h5">{ header }</Typography>
    {loading ? <CircularProgress /> : null}
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={index}
      margin={{
        top: 10, right: 120, bottom: 50, left: 60,
      }}
      padding={0.3}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'category10' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
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
  </Card>
);

export default BarChart;
