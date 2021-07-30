import mongoose from 'mongoose';

import {MONGOURL} from '../../src/config';
import {getAllOrders, organizeByProducer} from '../../src/services/orderService';
import {VaccineOrder as Order, VaccineName} from '../../src/types';

describe('Order service', () => {
    // Realistically i would have to create a separate
    // database for testing that's initialized every time but
    // since we wont be mutating data in the production 
    // db im just using it without initializing.
    mongoose.connect(
        MONGOURL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    let orders: Order[];

    it('getAll can fetch orders', async () => {
        orders = await getAllOrders();
        const keys = [
            'orderId', 'healthCareDistrict', 'orderNumber',
            'responsiblePerson', 'injections', 'arrived',
            'vaccine', 'vaccinations'
        ];
        expect(orders.length).not.toBe(0);
        keys.forEach(key =>
            expect(orders[0]).toHaveProperty(key)
        );
    });

    it('organizeByProducer', () => {
        const vaccines = [
            VaccineName['Antiqua'],
            VaccineName['Solar'],
            VaccineName['Zerpfy']
        ];
        const organized = organizeByProducer(orders);
        let totalOrganizedOrders = 0;
        vaccines.forEach(name => {   
            expect(organized).toHaveProperty(name);
            totalOrganizedOrders += organized[name].length;
        });
        expect(totalOrganizedOrders).toBe(orders.length);

    });



    
    afterAll(async () => await mongoose.connection.close());
});