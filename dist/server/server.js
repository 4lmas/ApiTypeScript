"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var index_routes_1 = __importDefault(require("../routes/index.routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.middlewares();
    }
    Server.prototype.middlewares = function () {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use('/', index_routes_1.default);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen((this.port = process.env.PORT || Server.PORT), function () {
            console.log("Server running in ".concat(_this.port));
        });
    };
    Server.PORT = 3000;
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map