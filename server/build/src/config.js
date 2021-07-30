"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_CLIENT_SECRET = exports.GITHUB_CLIENT_ID = exports.GITHUB_API_URL = exports.MONGOURL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '..', '.env') });
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3001;
console.log(process.env);
exports.MONGOURL = process.env.MONGOURL;
exports.GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com';
exports.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
exports.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
