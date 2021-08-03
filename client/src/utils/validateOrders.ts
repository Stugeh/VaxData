import {
  Orders, ProducerName, UnknownOrders, Gender,
} from '../types';

const isObject = (obj: unknown): obj is Record<string, unknown> => typeof obj === 'object' || obj instanceof Object;

const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

const isNumber = (num: unknown): num is number => typeof num === 'number' || num instanceof Number;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isArray = (arr: unknown): arr is Array<unknown> => Array.isArray(arr) || arr instanceof Array;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

const parseOrder = () => {

};

const parseProducerArrays = (data: UnknownOrders): Orders => {
  const producers: ProducerName[] = [
    ProducerName.SolarBuddhica, ProducerName.Zerpfy, ProducerName.Antiqua,
  ];
  const newOrders = producers.map((producer) => ({
    producer: data[producer].map((order) => {
      parseOrder(order);
    }),
  }));
  return newOrders as Orders;
};

const hasManufacturers = (data: unknown): data is UnknownOrders => {
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

// TODO write type guards for all fields
const validateOrders = (data: unknown): Orders|null => {
  try {
    if (!hasManufacturers(data)) throw new Error('missing manufacturer');
    const orders = parseProducerArrays(data);
    return orders;
  } catch (err) {
    return null;
  }
};

export default validateOrders;
