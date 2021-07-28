import OrderModel from '../models/order';
require('../models/vaccination');
import {
    OrganizedOrders,
    VaccineOrder as Order,
} from '../types';


export const organizeByProducer = (orders: Order[]) => {
    const organizedOrders: OrganizedOrders = {
        SolarBuddhica: {
            orders: [],
            counts: {
                orders: 0,
                doses: 0,
                expiredDoses: 0,
                dosesUsed: 0,
                dosesLeft: 0
            }
        },
        Zerpfy: {
            orders: [],
            counts: {
                orders: 0,
                doses: 0,
                expiredDoses: 0,
                dosesUsed: 0,
                dosesLeft: 0
            }
        },
        Antiqua: {
            orders: [],
            counts: {
                orders: 0,
                doses: 0,
                expiredDoses: 0,
                dosesUsed: 0,
                dosesLeft: 0
            }
        },
    };

    orders.forEach(order => {
        organizedOrders[order.vaccine].orders.push(order);
    });
    return organizedOrders;
};

export const getProducerCounts = () => {
    
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