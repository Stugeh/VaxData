import mongoose from 'mongoose';
import {Gender, Vaccination} from '../types';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const vaxSchema = new mongoose.Schema({
	id: { type: String, required: true },
	gender: { type: Gender, required: true },
	sourceBottle: { type: String, required: true },//bottle id
	injected: { type: String, required: true }//date of injection
});

vaxSchema.set('toJSON', {
	transform: (_document: unknown, returnedObj: Vaccination) => {
		returnedObj.id = returnedObj._id?.toString() as string;
		delete returnedObj._id;
		delete returnedObj.__v;
	},
});

const Vaccination = mongoose.model('Vaccination', vaxSchema);
module.exports = Vaccination;