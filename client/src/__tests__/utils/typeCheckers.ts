import {
  isObject,
  isString,
  isNumber,
  isDate,
  isArray,
  isGender,
  isHealthcareDistrict,
  isProducer,
  hasManufacturers,
} from '../../utils/typeCheckers';

describe('typeCheckers', () => {
    const checkFails = (fails: unknown[], checker: (function (unknown): Boolean)) => {
        fails.forEach((f) => expect(func(f)).toBe(false));
    }
    

  it('isObject', () => {
    const fails = [[], '', 1];
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'key', value: 3 })).toBe(true);
    checkFails(fails);
  });

  it('isString', () => {
    const fails = [{}, [], 1];
    expect(isString('')).toBe(true);
    fails.forEach((f) => expect(isString(f)).toBe(false));
  });

  it('isNumber', () => { });

  it('isDate', () => { });

  it('isArray', () => { });

  it('isGender', () => { });

  it('isHealthcareDistrict', () => { });

  it('isProducer', () => { });

  it('hasManufacturers', () => { });
});
