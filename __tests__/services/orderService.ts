import mongoose from 'mongoose';

import {MONGOURL} from '../../src/config';
import {getAllOrders} from '../../src/services/orderService';

describe('Order service', () => {
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