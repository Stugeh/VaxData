import OrderModel from '../models/order';
require('../models/vaccination');
import { OrganizedOrders, VaccineOrder as Order } from '../types';


export const organizeByProducer = (orders: Order[]) => {
    const organizedOrders: OrganizedOrders = {
        SolarBuddhica: [],
        Zerpfy: [],
        Antiqua: [],
    };
    orders.forEach(order => {
        organizedOrders[order.vaccine].push(order);
    });
    return organizedOrders;
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