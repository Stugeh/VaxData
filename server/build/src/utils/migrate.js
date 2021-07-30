"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration = exports.getDataFromFiles = exports.linesToVaccinations = exports.linesToOrders = exports.hasKeys = exports.parseVaccination = exports.parseOrder = void 0;
const readline_1 = __importDefault(require("readline"));
const order_1 = __importDefault(require("../models/order"));
const vaccination_1 = __importDefault(require("../models/vaccination"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
require('express-async-errors');
/**
 *
 * @param rawObject - Uncleaned up order object
 * @returns - Cleaned order Object
 */
const parseOrder = (rawObject) => ({
    orderId: rawObject.id,
    healthCareDistrict: rawObject.healthCareDistrict,
    orderNumber: rawObject.orderNumber,
    responsiblePerson: rawObject.responsiblePerson,
    injections: rawObject.injections,
    arrived: rawObject.arrived,
    vaccine: rawObject.vaccine,
});
exports.parseOrder = parseOrder;
/**
 *
 * @param rawObject - Uncleaned up vaccination object
 * @returns - Cleaned Vaccination Object
 */
const parseVaccination = (rawObject) => ({
    vaccinationId: rawObject['vaccination-id'],
    gender: rawObject.gender,
    sourceBottle: rawObject.sourceBottle,
    injected: rawObject.vaccinationDate,
});
exports.parseVaccination = parseVaccination;
/**
 *
 * @param keys - An array of keys you expect an object to have
 * @param object - The Object
 * @returns - Boolean
 */
const hasKeys = (keys, object) => (keys.every(key => Object.prototype.hasOwnProperty.call(object, key)));
exports.hasKeys = hasKeys;
/**
 *
 * @param lines - An array of lines that are convertible to orders
 * @returns - List of orders
 */
const linesToOrders = (lines) => {
    try {
        const keys = [
            'id', 'healthCareDistrict', 'orderNumber',
            'responsiblePerson', 'injections', 'arrived', 'vaccine'
        ];
        const orders = lines.map(line => {
            const order = JSON.parse(line);
            if (!exports.hasKeys(keys, order))
                throw new Error(`invalid order: ${line}`);
            return exports.parseOrder(order);
        });
        return orders;
    }
    catch (err) {
        throw new SyntaxError();
    }
};
exports.linesToOrders = linesToOrders;
/**
 *
 * @param lines - An array of lines that are convertible to vaccinations
 * @returns - List of vaccinations
 */
const linesToVaccinations = (lines) => {
    try {
        const keys = ['vaccination-id', 'gender', 'sourceBottle', 'vaccinationDate'];
        const vaccinations = lines.map(line => {
            const vaccination = JSON.parse(line);
            if (!exports.hasKeys(keys, vaccination))
                throw new Error(`invalid vaccination: ${line}`);
            return exports.parseVaccination(vaccination);
        });
        return vaccinations;
    }
    catch (err) {
        throw new SyntaxError();
    }
};
exports.linesToVaccinations = linesToVaccinations;
/**
 *
 * @param sources - an array of strings with the relative paths to data files
 * @returns the compiled data as an array of strings separated by line breaks
 */
const getDataFromFiles = (sources) => {
    const allData = sources.flatMap((source) => {
        const data = fs_1.default.readFileSync(__dirname + source, { encoding: 'utf-8', flag: 'r' });
        // remove trailing new line from EoF and make an array of lines
        return data.slice(0, -1).split('\n');
    });
    return allData;
};
exports.getDataFromFiles = getDataFromFiles;
/**
 * connects to database, wipes it and re-initializes data
 * @param orderObjects - an array of formatted orders,
 * @param vaccinationObjects - an array of formatted vaccinations
 */
const initDb = ({ orderObjects, vaccinationObjects }) => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect(config_1.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((err) => console.log('err', err));
    yield order_1.default.deleteMany({});
    yield vaccination_1.default.deleteMany({});
    yield order_1.default.insertMany(orderObjects);
    yield vaccination_1.default.insertMany(vaccinationObjects);
    mongoose_1.default.connection.close();
});
const migration = () => {
    const orderFiles = [
        '/../data/Antiqua.source',
        '/../data/SolarBuddhica.source',
        '/../data/Zerpfy.source',
    ];
    const vaccinationFiles = [
        '/../data/vaccinations.source'
    ];
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const orderData = exports.getDataFromFiles(orderFiles);
    const vaccinationData = exports.getDataFromFiles(vaccinationFiles);
    const orderObjects = exports.linesToOrders(orderData);
    const vaccinationObjects = exports.linesToVaccinations(vaccinationData);
    rl.question('This resets the database. are you sure? (y/n)', (answer) => {
        if (answer === 'y')
            initDb({ orderObjects, vaccinationObjects });
        rl.close();
    });
};
exports.migration = migration;
if (process.env.NODE_ENV !== 'test')
    exports.migration();
