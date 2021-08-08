"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
const orderSchema = new mongoose_1.default.Schema({
    orderId: { type: String, required: true },
    healthCareDistrict: { type: String, required: true },
    orderNumber: { type: Number, required: true },
    responsiblePerson: { type: String, required: true },
    injections: { type: Number, required: true },
    arrived: { type: String, required: true },
    vaccine: { type: String, required: true },
});
orderSchema.virtual('vaccinations', {
    ref: 'Vaccination',
    localField: 'orderId',
    foreignField: 'sourceBottle',
    justOne: false
});
orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', {
    transform: (_document, returnedObj) => {
        delete returnedObj._id;
        delete returnedObj.__v;
    },
    virtuals: true
});
exports.default = mongoose_1.default.model('Order', orderSchema);
