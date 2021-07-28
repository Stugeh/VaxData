import express, { Response } from 'express';
import { getAllOrders, getOrdersByName } from '../services/orderService';
const router = express.Router();

import { OrganizedOrders, OrderResponse, VaccineOrder as Order } from '../types'


const sendOrders = (body: OrderResponse, res: Response) => {
    if (body.orders.length === 0) res.sendStatus(404)
    else res.send(body)
}

const organizeByProducer = (orders: Order[]) => {
    const organizedOrders: OrganizedOrders = {
        SolarBuddhica: [],
        Zerpfy: [],
        Antiqua: [],
    }
    orders.forEach(order => {
        organizedOrders[order.vaccine].push(order)
    })
    return organizedOrders;
}

router.get('/', async (_req, res) => {
    try {
        const orders = await getAllOrders()
        const organizedOrders = organizeByProducer(orders)
        const body = {}
        sendOrders(body, res)
    } catch (err) {
        throw new Error(err)
    }
})


export default router;