import mongoose from 'mongoose';

import {MONGOURL} from '../../src/config';
import {getAllOrders} from '../../src/services/orderService';

describe('getAllOrders', () => {
    mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
    it('Can fetch orders', async () => {
        const orders = await getAllOrders();
        expect(orders.length).not.toBe(0);
    });
    
    afterAll(async () => await mongoose.connection.close());
});