/**
 * @jest-environment node
 */

import mongoose from 'mongoose';

//import * as orderService from '../../src/services/orderService';

describe('getAllOrders', () => {
    it('sanity check', () => {
        expect(1).toBe(1);
    });

    // it('Can fetch orders', async () => {
    //     jest.setTimeout(20000);
    //     const orders = await orderService.getAllOrders();
    //     expect(orders.length).not.toBe(0);
    // });

    afterAll(async () => await mongoose.connection.close());

});