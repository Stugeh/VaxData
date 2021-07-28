import express, { Response } from 'express';
import { getAllOrders, organizeByProducer } from '../services/orderService';
const router = express.Router();

import { OrderResponse } from '../types'


const sendOrders = (body: OrderResponse, res: Response) => {
    if (body.orders.length === 0) res.sendStatus(404)
    else res.send(body)
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