"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
const path_1 = require("path");
const userRouter_1 = require("./api/userRouter");
const productRouter_1 = __importDefault(require("./api/productRouter"));
//Declareing Static Directory for Serving Static Files
const staticDir = (0, path_1.join)(__dirname, '..', '..', 'public');
//Creatring Router instance
const router = express_1.default.Router();
// Useing Static Directory for Serving Static Files
router.use('/static', express_1.default.static(staticDir));
// Welcome Message With / EndPoint
router.get('/', controllers_1.welcomeMessage);
//using userRouter
router.use('/users', userRouter_1.userRouter);
//using productRouter
router.use('/products', productRouter_1.default);
// Response With Not Found for any invalid path
router.all('/*', controllers_1.notFound);
exports.default = router;
