"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = require("express");
var users_routes_1 = __importDefault(require("./users.routes"));
var rol_routes_1 = __importDefault(require("./rol.routes"));
// these imports are very important for the use this file and another functions of system
dotenv_1.default.config();
var URL = process.env.URL;
var routes = (0, express_1.Router)();
routes.use("".concat(URL, "/user"), users_routes_1.default);
routes.use("".concat(URL, "/rol"), rol_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map