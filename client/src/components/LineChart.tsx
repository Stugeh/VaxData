import { ResponsiveLine, Serie } from '@nivo/line';
import { Card, Typography } from '@material-ui/core';

type ChartInput = { data: Serie[], header: string}

const LineChart = ({
  data, header,
}:ChartInput) => (
  <Card className="chart">
    <Typography variant="h5">{header}</Typography>
    <ResponsiveLine
      data={data}
      margin={{
        top: 50, right: 110, bottom: 50, left: 60,
      }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </Card>
);

export default LineChart;
