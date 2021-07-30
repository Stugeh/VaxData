import express from 'express';
import { getAllOrders, organizeByProducer } from '../services/orderService';
const router = express.Router();


router.get('/', async (_req, res) => {
    try {
        const orders = await getAllOrders();
        const organizedOrders = organizeByProducer(orders);
        res.send(organizedOrders);
    } catch (err) {
        throw new Error(err);
    }
});


export default router;