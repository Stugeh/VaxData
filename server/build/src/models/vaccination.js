"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types");
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
const vaxSchema = new mongoose_1.default.Schema({
    vaccinationId: { type: String, required: true },
    gender: { type: types_1.Gender, required: true },
    sourceBottle: { type: String, required: true },
    injected: { type: String, required: true } //date of injection
});
vaxSchema.virtual('bottleInfo', {
    ref: 'Order',
    localField: 'sourceBottle',
    foreignField: 'orderId',
    justOne: true,
});
vaxSchema.set('toObject', { virtuals: true });
vaxSchema.set('toJSON', {
    transform: (_document, returnedObj) => {
        delete returnedObj._id;
        delete returnedObj.__v;
    },
    virtuals: true
});
exports.default = mongoose_1.default.model('Vaccination', vaxSchema);
