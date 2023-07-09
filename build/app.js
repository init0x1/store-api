"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Useing BodyParser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//Secure Http Headers With By Setting Some  Verious Values And Xss Filter
app.use((0, helmet_1.default)());
//Logging Http Requests in Dev Mode
if (process.env.NODE_ENV == 'dev') {
    app.use((0, morgan_1.default)('dev'));
}
// Useing Routes And Api
app.use(routes_1.default);
// starting Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[+] Server Listening Now at Port : ${PORT} `);
});
exports.default = app;
