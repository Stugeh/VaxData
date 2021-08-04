import {
  Order, Orders, ProducerName, UnknownOrders, Gender, HealthCareDistrict, Vaccination,
} from '../types';

const isObject = (obj: unknown): obj is Record<string, unknown> => typeof obj === 'object' || obj instanceof Object;

const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

const isNumber = (num: unknown): num is number => typeof num === 'number' || num instanceof Number;

const isIntString = (numString: string): boolean => Boolean(parseInt(numString, 10));

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isArray = (arr: unknown): arr is Array<unknown> => Array.isArray(arr) || arr instanceof Array;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

const isHealthcareDistrict = (district: unknown): district is HealthCareDistrict => {
  if (!isString(district)) throw new Error('district must be a string');
  const districts = ['HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS'];
  return districts.includes(district);
};

const isProducer = (producer: string): producer is ProducerName => {
  const producers = ['SolarBuddhica', 'Zerpfy', 'Antiqua'];
  return producers.includes(producer);
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) throw new Error('Invalid or missing id');
  return id;
};

const parseDistrict = (district: unknown): HealthCareDistrict => {
  if (!district || !isHealthcareDistrict(district)) throw new Error('Invalid or missing healthcare district');
  return district;
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return new Date(date);
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) throw new Error('Invalid or missing string');
  return str;
};

const parseIntFromString = (num: unknown): number => {
  if (!num || !isString(num) || !isIntString) throw new Error('Invalid or missing number');
  const parsed = parseInt(num, 10);
  if (!isNumber(parsed)) throw new Error('Invalid or missing number');
  return parsed;
};

const parseProducer = (producer: unknown): ProducerName => {
  if (!producer || !isString(producer) || !isProducer(producer)) throw new Error('Invalid or missing producer');
  return ProducerName[producer];
};

const parseVaccination = (vaccination: unknown): Vaccination => {

};

const parseVaccinations = (vaccinations: unknown): Vaccination[] => {
  if (!isArray(vaccinations)) throw new Error('Vaccinations is not an array');
  const parsedVaccinations = vaccinations.map((vax) => parseVaccination(vax));
  return parsedVaccinations;
};

const parseOrder = (order: unknown):Order => {
  if (!isObject(order)) throw new Error('order is not an object');
  return {
    orderId: parseId(order.orderId),
    healthCareDistrict: parseDistrict(order.healthCareDistrict),
    orderNumber: parseIntFromString(order.orderNumber),
    responsiblePerson: parseString(order.responsiblePerson),
    injections: parseIntFromString(order.injections),
    arrived: parseDate(order.arrived),
    vaccine: parseProducer(order.vaccine),
    vaccinations: parseVaccinations(order.vaccinations),
  };
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
