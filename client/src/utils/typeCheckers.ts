import {
  ProducerName, UnknownOrders, Gender, HealthCareDistrict,
} from '../types';

export const isObject = (obj: unknown): obj is Record<string, unknown> => (typeof obj === 'object' || obj instanceof Object) && !Array.isArray(obj);

export const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

export const isNumber = (num: unknown): num is number => typeof num === 'number' || num instanceof Number;

export const isDate = (date: string): boolean => Boolean(Date.parse(date));

export const isArray = (
  arr: unknown,
): arr is Array<unknown> => Array.isArray(arr) || arr instanceof Array;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

// checks that a given value is in the healthcare district type
export const isHealthcareDistrict = (district: unknown): district is HealthCareDistrict => {
  if (!isString(district)) throw new Error('district must be a string');
  const districts = ['HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS'];
  return districts.includes(district);
};

// Checks that the given string is in the producers array
export const isProducer = (producer: string): producer is ProducerName => {
  const producers = ['SolarBuddhica', 'Zerpfy', 'Antiqua'];
  return producers.includes(producer);
};

// Checks that the input data has all the keys in ProducerNames enum
export const hasManufacturers = (data: unknown): data is UnknownOrders => {
  try {
    if (!isObject(data)) throw new Error('not an object');
    const producers = Object.keys(ProducerName);
    producers.forEach((producer) => {
      if (!Object.keys(data).includes(producer)) {
        throw new Error('Missing key');
      }
      if (!isArray(data[producer])) {
        throw new Error(`data under key: ${producer} was not an array.`);
      }
    });
    return true;
  } catch (err) {
    return false;
  }
};
