import mongoose from 'mongoose';
import { VaccineOrder } from '../types';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const orderSchema = new mongoose.Schema({
	orderId: { type: String, required: true },
	healthCareDistrict: { type: String, required: true },
	orderNumber: { type: Number, required: true },
	responsiblePerson: { type: String, required: true },
	injections: { type: Number, required: true },
	arrived: { type: String, required: true },
	vaccine: { type: String, required: true },
});

orderSchema.set('toJSON', {
	transform: (_document: unknown, returnedObj: VaccineOrder) => {
		delete returnedObj._id;
		delete returnedObj.__v;
	},
});

module.exports = mongoose.model('Order', orderSchema);