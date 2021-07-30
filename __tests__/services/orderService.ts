import mongoose from 'mongoose';

import {MONGOURL} from '../../src/config';
import {getAllOrders} from '../../src/services/orderService';

describe('Order service', () => {
    // Realistically i would have to create a separate
    // database for testing that's initialized every time but
    // since we wont be inserting or deleting info in
    // production db im just using the production db
    // without initializing it.
    mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });

    it('getAll can fetch orders', async () => {
        const orders = await getAllOrders();
        const order = orders[0];
        const keys = [
            'orderId', 'healthCareDistrict', 'orderNumber',
            'responsiblePerson', 'injections', 'arrived',
            'vaccine', 'vaccinations'
        ];
        expect(orders.length).not.toBe(0);
        keys.forEach(key =>
            expect(order).toHaveProperty(key)
        );
    });


    
    afterAll(async () => await mongoose.connection.close());
});