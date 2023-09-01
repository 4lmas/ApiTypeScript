"use strict";
/**
 * import @module Rol for the use in this part
 * import @param Request && @param Response from express
 * @class <RolController> is used for createRol, getRol, getByIdRol, updateRol && deleteRol
 * and finally exports the class
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rol_1 = require("../models/Rol");
var data_source_1 = require("../data-source");
var userRepository = data_source_1.AppdataSource.getRepository(Rol_1.Rol);
var RolController = /** @class */ (function () {
    function RolController() {
    }
    var _a;
    _a = RolController;
    RolController.createRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var rol, role, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    rol = req.body.rol;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    role = new Rol_1.Rol();
                    role.rol = rol;
                    return [4 /*yield*/, userRepository.save(role)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            message: "The rol has been saved!"
                        })];
                case 3:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            errorMessage: "An error has been ocurred: ".concat(error_1)
                        })];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    RolController.getRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var rol, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userRepository.find({
                            where: { isActive: true }
                        })];
                case 1:
                    rol = _b.sent();
                    return [2 /*return*/, rol.length > 0
                            ? res.status(200).json({ ok: true, rol: rol })
                            : res.json({ ok: false, ErrorMessage: "Rol not found" })];
                case 2:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            errorMessage: "An error ocurred: ".concat(error_2)
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RolController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, rol, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = parseInt(req.params.id);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOne({
                            where: { id: id, isActive: true },
                        })];
                case 2:
                    rol = _b.sent();
                    return [2 /*return*/, rol ? res.status(200).json({ ok: true, rol: rol })
                            : res.json({ ok: false, ErrorMEsage: "rol no encontrado" })];
                case 3:
                    error_3 = _b.sent();
                    res.json({
                        ok: false,
                        errorMessage: "Error ocurred while search: ".concat(error_3)
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    RolController.updateRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, rol, repoRol, role, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = parseInt(req.params.id);
                    rol = req.body.rol;
                    repoRol = data_source_1.AppdataSource.getRepository(Rol_1.Rol);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, userRepository.findOneOrFail({
                            where: { id: id, isActive: true }
                        })];
                case 2:
                    role = _b.sent();
                    if (!rol) {
                        throw new Error("El usuario no existe!");
                    }
                    role.rol = rol;
                    return [4 /*yield*/, repoRol.save(role)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            message: "Operation is succesfull"
                        })];
                case 4:
                    error_4 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            errorMessage: "server error"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    RolController.deleteRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, repoRol, rol, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = parseInt(req.params.id);
                    repoRol = data_source_1.AppdataSource.getRepository(Rol_1.Rol);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, repoRol.findOne({
                            where: { id: id }
                        })];
                case 2:
                    rol = _b.sent();
                    console.log(rol);
                    if (!rol) {
                        throw new Error("Rol doesn't exist in the data base");
                    }
                    rol.isActive = false;
                    return [4 /*yield*/, repoRol.save(rol)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            message: "The user was deleted"
                        })];
                case 4:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: "Server Error"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    RolController.paginRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, take, repoRol, _b, roles, totalItems, totalPages, nextPage, prevPage, e_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    page = req.query.page || 1;
                    page = Number(page);
                    take = req.query.take || 5;
                    take = Number(take);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    repoRol = data_source_1.AppdataSource.getRepository(Rol_1.Rol);
                    return [4 /*yield*/, repoRol.findAndCount({
                            where: { isActive: true },
                            skip: (page - 1) * take,
                            take: take
                        })];
                case 2:
                    _b = _c.sent(), roles = _b[0], totalItems = _b[1];
                    try {
                        if (roles.length > 0) {
                            totalPages = totalItems / take;
                            if (totalPages % 1 !== 0) {
                                totalPages = Math.trunc(totalPages) + 1;
                            }
                            nextPage = page >= totalPages ? page : page + 1;
                            prevPage = page <= 1 ? page : page - 1;
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    msg: "Roles encontrados",
                                    roles: roles,
                                    totalItems: totalItems,
                                    totalPages: totalPages,
                                    currentPage: page,
                                    nextPage: nextPage,
                                    prevPage: prevPage,
                                    empty: true,
                                    take: take
                                })];
                        }
                        else {
                            return [2 /*return*/, res.json({
                                    ok: false,
                                    message: "No se encontraron roles",
                                    empty: false
                                })];
                        }
                    }
                    catch (e) {
                        return [2 /*return*/, res.json({
                                ok: false,
                                error: "Error \n".concat(e),
                                message: 'Ah ocurrido un error'
                            })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            error: "Error \n".concat(e_1),
                            message: 'Ah ocurrido un error iesperado'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return RolController;
}());
;
exports.default = RolController;
//# sourceMappingURL=rol.controller.js.map