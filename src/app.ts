import express from 'express';
import mongoose from 'mongoose';
import {MONGOURL} from './config';

const app = express();
// models

// utils

// DB connection
console.info('connecting to', MONGOURL);
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch((err) => console.log('err', err));



/* app config */
app.use(express.json());
app.use(express.static('build'));
// middleware

// Routers


export default app;