"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const app = express_1.default();
// DB connection
console.info('connecting to', config_1.MONGOURL);
mongoose_1.default.connect(config_1.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => console.log('err', err));
/* app config */
app.use(express_1.default.json());
app.use(express_1.default.static('build'));
// middleware
app.use(cors_1.default());
// Routers
app.use('/api/orders/', orderRouter_1.default);
exports.default = app;
