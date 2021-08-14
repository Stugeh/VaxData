import validateOrders from '../../utils/validateOrders';
import { rawOrders, testOrders } from '../../testConstants';

describe('validateOrders integration test', () => {
  it('correctly formatted data', () => {
    const orders = validateOrders(rawOrders);
    expect(orders).toEqual(testOrders);
  });

  it('invalid data', () => {
    const invalidOrders = {
      ...rawOrders,
      Zerpfy: [
        ...rawOrders.Zerpfy,
        rawOrders.Zerpfy[1].arrived = '',
      ],
    };
    expect(validateOrders(invalidOrders)).toBe(null);
  });
});

describe('validateOrders unit tests', () => {
  it('parseDistrict', () => { });

  it('parseDate', () => { });

  it('parseString', () => { });

  it('parseNumber', () => { });

  it('parseProducer', () => { });

  it('parseGender', () => { });

  it('parseSrcBottle', () => { });

  it('parseVaccination', () => { });

  it('parseVaccinations', () => { });

  it('parseOrder', () => { });

  it('parseProducerArrays', () => { });

  it('validateOrders', () => {});
});
