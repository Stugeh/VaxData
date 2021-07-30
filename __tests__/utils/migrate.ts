import {
    getDataFromFiles,
    linesToOrders,
    linesToVaccinations
} from '../../src/utils/migrate';

describe('Testing migrate scripts', () => {

    const orderFiles = [
        '/../data/Antiqua.source',
        '/../data/SolarBuddhica.source',
        '/../data/Zerpfy.source',
    ];
    const firstOrderString = '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}';
    const invalidStringArray = [
        '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}',
        '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z'
    ];
    const vaxStringArray = [
        '{"vaccination-id":"3d3440e2-357b-4139-857b-027d8bdcb85b","sourceBottle":"75ae9638-3ad5-4433-9e94-55cc2e36c777","gender":"female","vaccinationDate":"2021-03-07T19:23:29.670958Z"}',
        '{"vaccination-id":"4b30e155-7105-4346-8d1b-9411178cf74a","sourceBottle":"6ae207d9-6fa9-4b62-bf37-74fe2ac25254","gender":"nonbinary","vaccinationDate":"2021-02-08T14:44:02.663848Z"}',
        '{"vaccination-id":"23141063-8fa3-4f0d-8cee-c6fadedde057","sourceBottle":"8ca928e7-68f3-42f9-80c9-be4e56bd42d3","gender":"female","vaccinationDate":"2021-03-27T15:45:18.683818Z"}'
    ];

    it('Getting data from files works', () => {
        const data = getDataFromFiles(orderFiles);
        expect(data.length).not.toBe(0);
        expect(data[0]).toEqual(firstOrderString);
    });

    it('Order data is correctly converted to order objects', () => {
        const data = getDataFromFiles(orderFiles).slice(0, 11);
        const objects = linesToOrders(data);
        expect(objects.length).toBe(data.length);
        expect(objects[0].orderId).toBe('6da3a8cf-c923-4c77-8f80-c69c935fe1df');
        
        expect(() => {
            linesToOrders(invalidStringArray);
        }).toThrow(SyntaxError);
        
        expect(() => {
            linesToOrders(vaxStringArray);
        }).toThrow();
    });

    it('Vaccination data is correctly converted to vaccination objects', () => {
        const objects = linesToVaccinations(vaxStringArray);
        expect(objects.length).toBe(vaxStringArray.length);
        expect(objects[0].vaccinationId).toBe('3d3440e2-357b-4139-857b-027d8bdcb85b');
        
        expect(() => {
            linesToVaccinations(invalidStringArray);
        }).toThrow(SyntaxError);

        expect(() => {
            linesToVaccinations(getDataFromFiles(orderFiles));
        }).toThrow();
    });
});