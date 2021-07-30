"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migrate_1 = require("../../src/utils/migrate");
const testHelper_1 = require("../../testHelper");
describe('Testing migrate scripts', () => {
    const firstOrderString = '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}';
    it('Getting data from files works', () => {
        const data = migrate_1.getDataFromFiles(testHelper_1.orderFilePaths);
        expect(data.length).not.toBe(0);
        expect(data[0]).toEqual(firstOrderString);
    });
    it('Order data is correctly converted to order objects', () => {
        const data = migrate_1.getDataFromFiles(testHelper_1.orderFilePaths).slice(0, 11);
        const objects = migrate_1.linesToOrders(data);
        expect(objects.length).toBe(data.length);
        expect(objects[0].orderId).toBe('6da3a8cf-c923-4c77-8f80-c69c935fe1df');
        expect(() => {
            migrate_1.linesToOrders(testHelper_1.invalidOrderStrings);
        }).toThrow(SyntaxError);
        expect(() => {
            migrate_1.linesToOrders(testHelper_1.vaxStrings);
        }).toThrow();
    });
    it('Vaccination data is correctly converted to vaccination objects', () => {
        const objects = migrate_1.linesToVaccinations(testHelper_1.vaxStrings);
        expect(objects.length).toBe(testHelper_1.vaxStrings.length);
        expect(objects[0].vaccinationId).toBe('3d3440e2-357b-4139-857b-027d8bdcb85b');
        expect(() => {
            migrate_1.linesToVaccinations(testHelper_1.invalidOrderStrings);
        }).toThrow(SyntaxError);
        expect(() => {
            migrate_1.linesToVaccinations(migrate_1.getDataFromFiles(testHelper_1.orderFilePaths));
        }).toThrow();
    });
});
