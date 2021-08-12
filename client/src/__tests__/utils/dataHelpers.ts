import {
  isSameDay, isBefore, addDays, addSeconds, isAfter, max,
} from 'date-fns';
import { testOrders } from '../../testConstants';
import { getLatestDate } from '../../utils/dataHelpers';

describe('dataHelpers', () => {
  it('getLatestDate', () => {
    const dates = [
      ...testOrders.Antiqua,
      ...testOrders.SolarBuddhica,
      ...testOrders.Zerpfy,
    ].map((order) => order.arrived);
    const latestDate = getLatestDate(testOrders);
    expect(latestDate).toEqual(max(dates));
  });

  it('', => {
    
  });
});
