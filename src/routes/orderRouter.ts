import express from 'express';
import { getAllOrders } from '../services/orderService';
const router = express.Router();

router.get('/', async (_req, res) => {
    const orders = await getAllOrders()
    if (orders.length > 0) {
        res.send(orders)
    }
    res.send(404)
})

export default router;