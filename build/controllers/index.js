"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeMessage = exports.notFound = void 0;
const welcomeMessage = (_req, res) => {
    res.status(200).json({ Server: 'Server is Working !', PowerdBy: 'cryptopress ' });
};
exports.welcomeMessage = welcomeMessage;
const notFound = (req, res) => {
    res.status(404).json({ Error: '[-] Error 404 Not Found ' });
};
exports.notFound = notFound;
