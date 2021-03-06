import mongoose from 'mongoose';
import { Gender, Vaccination } from '../types';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const vaxSchema = new mongoose.Schema({
    vaccinationId: { type: String, required: true },
    gender: { type: Gender, required: true },
    sourceBottle: { type: String, required: true },//bottle id
    injected: { type: String, required: true }//date of injection
});

vaxSchema.virtual('bottleInfo', {
    ref: 'Order',
    localField: 'sourceBottle',
    foreignField: 'orderId',
    justOne: true,
});

vaxSchema.set('toObject', { virtuals: true });
vaxSchema.set('toJSON', {
    transform: (_document: unknown, returnedObj: Vaccination) => {
        delete returnedObj._id;
        delete returnedObj.__v;
    },
    virtuals: true
});



export default mongoose.model('Vaccination', vaxSchema);