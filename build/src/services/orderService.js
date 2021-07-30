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
exports.getOrdersByName = exports.getAllOrders = exports.organizeByProducer = void 0;
const order_1 = __importDefault(require("../models/order"));
require('../models/vaccination');
/**
 *
 *  Organizes orders into an object under each producer as arrays.
 * @param orders
 * @returns
 */
const organizeByProducer = (orders) => {
    try {
        const organizedOrders = {
            SolarBuddhica: [],
            Zerpfy: [],
            Antiqua: []
        };
        orders.forEach(order => {
            organizedOrders[order.vaccine].push(order);
        });
        return organizedOrders;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.organizeByProducer = organizeByProducer;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default
        .find({})
        .populate('vaccinations');
    return orders;
});
exports.getAllOrders = getAllOrders;
const getOrdersByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default
        .find({ vaccine: name })
        .populate('vaccinations');
    return orders;
});
exports.getOrdersByName = getOrdersByName;
