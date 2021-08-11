import { render, screen } from '@testing-library/react';
import { Dispatch, SetStateAction } from 'react';
import TopBar from '../../components/TopBar';

describe('<TopBar/>', () => {
  it('should render', () => {
    const testDate = new Date();
    const setter: Dispatch<SetStateAction<Date | null>> = () => (null);
    render(<TopBar date={testDate} setDate={setter} />);
    expect(screen.getByText('VaxData')).toBeVisible();
    expect(screen.getByText('Pick date to examine')).toBeVisible();
  });
});
