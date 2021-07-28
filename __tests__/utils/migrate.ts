/**
 * @jest-environment node
 */
import * as migrate from '../../src/utils/migrate'

describe('Testing migrate scripts', () => {
    const orderFiles = [
        '/../data/Antiqua.source',
        '/../data/SolarBuddhica.source',
        '/../data/Zerpfy.source',
    ];
    const firstOrderString = '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}'
    const invalidStringArray = [
        '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}',
        '{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z'
    ]

    it('Getting data from files works', () => {
        const data = migrate.getDataFromFiles(orderFiles)
        expect(data.length).not.toBe(0);
        expect(data[0]).toEqual(firstOrderString)
    })

    it('Order data is correctly converted to order objects', () => {
        const data = migrate.getDataFromFiles(orderFiles).slice(0, 11)
        const objects = migrate.linesToOrders(data)
        expect(objects.length).toBe(data.length)
        expect(objects[0].orderId).toBe("6da3a8cf-c923-4c77-8f80-c69c935fe1df")
        expect(() => {
            migrate.linesToOrders(invalidStringArray)
        }).toThrow(SyntaxError)
    })

    it('', () => {

    })

    it('', () => {

    })
})