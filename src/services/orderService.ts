import OrderModel from '../models/order';
require('../models/vaccination');
import {VaccineOrder as Order} from '../types';



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