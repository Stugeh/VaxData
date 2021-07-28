import express from 'express';
import { getAllOrders } from '../services/orderService';
const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const orders = await getAllOrders()
        if (orders.length === 0) res.sendStatus(404)
        else res.send(orders)
    } catch (err) {
        console.log(err);
    }
})

export default router;