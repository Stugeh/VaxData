import OrderModel from '../models/order';
require('../models/vaccination');
import {VaccineOrder as Order} from '../types';



export const getAllOrders = async () => {
    const orders = await OrderModel
        .find({})
        .populate('vaccinations') as Order[];
    return orders;
};