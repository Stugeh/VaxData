import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import { MONGOURL } from './config';
import orderRouter from './routes/orderRouter';

const app = express();

// DB connection
console.info('connecting to mongodb');
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => console.log('err', err));



/* app config */
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// middleware
app.use(cors());

// Routers
app.use('/api/orders/', orderRouter);
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/health', (_req, res) => {
    res.send('ok');
});


export default app;