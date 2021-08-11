import { render, screen } from '@testing-library/react';
import BarChart from '../../components/BarChart';

describe('<BarChart/>', () => {
  it('should render', () => {
    const keys = ['amount1', 'amount2'];
    const data = [
      {
        index: 'bar1',
        amount1: 6,
        amount2: 10,
      },
      {
        index: 'bar1',
        amount1: 7,
        amount2: 15,
      },
    ];

    render(
      <BarChart
        header="test header"
        data={data}
        keys={keys}
        index="index"
      />,
    );
    expect(screen.getByText('test header')).toBeVisible();
  });
});
