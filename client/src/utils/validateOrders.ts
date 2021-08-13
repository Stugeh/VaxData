import {
  Order, Orders, ProducerName, UnknownOrders, Gender, HealthCareDistrict, Vaccination,
} from '../types';

import {
  isNumber, isString, isObject, isArray, hasManufacturers, isHealthcareDistrict,
  stringIsValidDate, isProducer, isGender,
} from './typeCheckers';

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) throw new Error('Invalid or missing id');
  return id;
};

const parseDistrict = (district: unknown): HealthCareDistrict => {
  if (!district || !isHealthcareDistrict(district)) throw new Error('Invalid or missing healthcare district');
  return district;
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !stringIsValidDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return new Date(date);
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) throw new Error('Invalid or missing string');
  return str;
};

const parseNumber = (num: unknown): number => {
  if (num === null || !isNumber(num)) throw new Error('Invalid or missing number');
  return num;
};

const parseProducer = (producer: unknown): ProducerName => {
  if (!producer || !isString(producer) || !isProducer(producer)) throw new Error('Invalid or missing producer');
  return ProducerName[producer];
};

const parseGender = (gender: unknown):Gender => {
  if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
  return gender;
};

const parseSrcBottle = (bottle: unknown): string => {
  if (!bottle || !isString(bottle)) throw new Error('Invalid or missing bottle');
  return bottle;
};

const parseVaccination = (vaccination: unknown): Vaccination => {
  if (!vaccination || !isObject(vaccination)) throw new Error('vaccination missing or is not an object');
  return {
    vaccinationId: parseId(vaccination.vaccinationId),
    gender: parseGender(vaccination.gender),
    sourceBottle: parseSrcBottle(vaccination.sourceBottle),
    injected: parseDate(vaccination.injected),
  };
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
    orderNumber: parseNumber(order.orderNumber),
    responsiblePerson: parseString(order.responsiblePerson),
    injections: parseNumber(order.injections),
    arrived: parseDate(order.arrived),
    vaccine: parseProducer(order.vaccine),
    vaccinations: parseVaccinations(order.vaccinations),
  };
};

// Parses the arrays under all the keys of an Orders object.
// and returns the completely parsed Orders.
const parseProducerArrays = (data: UnknownOrders): Orders => {
  const producers = [
    ProducerName.SolarBuddhica, ProducerName.Zerpfy, ProducerName.Antiqua,
  ];
  const newOrders: Orders = {
    SolarBuddhica: [],
    Zerpfy: [],
    Antiqua: [],
  };

  producers.forEach((producer) => {
    newOrders[producer] = data[producer]
      .map((order) => parseOrder(order));
  });
  return newOrders;
};

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
