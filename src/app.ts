import express from 'express';
import mongoose from 'mongoose';

import { MONGOURL } from './config';
import orderRouter from './routes/orderRouter';

const app = express();

// DB connection
console.info('connecting to', MONGOURL);
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => console.log('err', err));



/* app config */
app.use(express.json());
app.use(express.static('build'));
// middleware

// Routers
app.use('/api/orders/', orderRouter);


export default app;