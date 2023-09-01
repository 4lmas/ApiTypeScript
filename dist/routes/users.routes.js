"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controller/user.controller"));
var login_controller_1 = __importDefault(require("../auth/login.controller"));
var router = (0, express_1.Router)();
var user = user_controller_1.default;
var auth = login_controller_1.default;
// methos for redirections
router.post("/", user.createUser);
router.get("/pagination", user.paginUser);
router.get("/", user.getUser);
router.put("/:id", user.updateUser);
router.get("/:id", user.getById);
//router.post("/login", user.loginUser);
router.delete("/:id", user.deleteUser);
router.post("/login", auth.loginUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map