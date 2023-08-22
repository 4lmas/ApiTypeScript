"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var rol_controller_1 = __importDefault(require("../controller/rol.controller"));
var router = (0, express_1.Router)();
var rol = rol_controller_1.default;
router.post("/", rol.createRol);
router.get("/", rol.getRol);
router.get("/:id", rol.getById);
router.put("/:id", rol.updateRol);
router.delete("/:id", rol.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.routes.js.map