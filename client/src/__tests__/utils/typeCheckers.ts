import {
  isObject,
  isString,
  isNumber,
  stringIsValidDate,
  isArray,
  isGender,
  isHealthcareDistrict,
  isProducer,
  hasManufacturers,
} from '../../utils/typeCheckers';

import { ProducerName } from '../../types';

type Checker = (value: unknown) => boolean;

describe('typeCheckers', () => {
  const checkTypeFails = (array: unknown[], checker: Checker) => {
    array.forEach((value) => expect(checker(value)).toBe(false));
  };

  it('isObject', () => {
    const fails = [[], '', 1];
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'key', value: 3 })).toBe(true);
    checkTypeFails(fails, isObject);
  });

  it('isString', () => {
    const fails = [{}, [], 1];
    expect(isString('')).toBe(true);
    checkTypeFails(fails, isString);
  });

  it('isNumber', () => {
    const fails = [{}, [], ''];
    expect(isNumber(5)).toBe(true);
    expect(isNumber(0)).toBe(true);
    checkTypeFails(fails, isNumber);
  });

  it('stringIsValidDate', () => {
    const fails = ['', 'asd'];
    checkTypeFails(fails, stringIsValidDate as Checker);
    expect(stringIsValidDate('2021-02-21T19:12:08.685533Z')).toBe(true);
  });

  it('isArray', () => {
    const fails = ['', 'asd', {}, 1];
    checkTypeFails(fails, isArray);
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2])).toBe(true);
  });

  it('isGender', () => {
    const successes = ['male', 'female', 'nonbinary'];
    successes.forEach((value) => expect(isGender(value)).toBe(true));
    expect(isGender('test')).toBe(false);
  });

  it('isHealthcareDistrict', () => {
    const successes = ['HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS'];
    successes.forEach((val) => expect(isHealthcareDistrict(val)).toBe(true));
    expect(isHealthcareDistrict('TEST')).toBe(false);
  });

  it('isProducer', () => {
    const successes = Object.values(ProducerName);
    successes.forEach((val) => expect(isProducer(val)).toBe(true));
    expect(isProducer('TEST')).toBe(false);
  });

  it('hasManufacturers', () => {
    const fails = [
      { Antiqua: [] },
      {
        Antiqua: '',
        SolarBuddhica: [],
        Zerpfy: [],
      },
      'TEST',
      [],
      1,
    ] as unknown [];
    checkTypeFails(fails, hasManufacturers);
    const success = { Antiqua: [], SolarBuddhica: [], Zerpfy: [] };
    expect(hasManufacturers(success)).toBe(true);
  });
});
