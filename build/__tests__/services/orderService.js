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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../src/config");
const orderService_1 = require("../../src/services/orderService");
const types_1 = require("../../src/types");
describe('Order service', () => {
    // Realistically i would have to create a separate
    // database for testing that's initialized every time but
    // since we wont be mutating data in the production 
    // db im just using it without initializing.
    mongoose_1.default.connect(config_1.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
    let orders;
    it('getAll can fetch orders', () => __awaiter(void 0, void 0, void 0, function* () {
        orders = yield orderService_1.getAllOrders();
        const keys = [
            'orderId', 'healthCareDistrict', 'orderNumber',
            'responsiblePerson', 'injections', 'arrived',
            'vaccine', 'vaccinations'
        ];
        expect(orders.length).not.toBe(0);
        keys.forEach(key => expect(orders[0]).toHaveProperty(key));
    }));
    it('organizeByProducer', () => {
        const vaccines = [
            types_1.VaccineName['Antiqua'],
            types_1.VaccineName['Solar'],
            types_1.VaccineName['Zerpfy']
        ];
        const organized = orderService_1.organizeByProducer(orders);
        let totalOrganizedOrders = 0;
        vaccines.forEach(name => {
            expect(organized).toHaveProperty(name);
            totalOrganizedOrders += organized[name].length;
        });
        expect(totalOrganizedOrders).toBe(orders.length);
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.connection.close(); }));
});
