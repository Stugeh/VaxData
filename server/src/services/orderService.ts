import OrderModel from '../models/order';
require('../models/vaccination');
import {
    OrganizedOrders,
    VaccineOrder as Order,
} from '../types';

/**
 * 
 *  Organizes orders into an object under each producer as arrays.
 * @param orders 
 * @returns 
 */
export const organizeByProducer = (orders: Order[]) => {
    try {
        orders.sort((a, b) => (
            new Date(b.arrived).getTime() - new Date(a.arrived).getTime()
        ));
        const organizedOrders: OrganizedOrders = {
            SolarBuddhica: [],
            Zerpfy: [],
            Antiqua: []
        };
        orders.forEach(order => {
            organizedOrders[order.vaccine].push(order);
        });

        return organizedOrders;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getAllOrders = async () => {
    const orders = await OrderModel
        .find({})
        .populate('vaccinations') as Order[];
    return orders;
};

export const getOrdersByName = async (name: string) => {
    const orders = await OrderModel
        .find({ vaccine: name })
        .populate('vaccinations') as Order[];
    return orders;
};