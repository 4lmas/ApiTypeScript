"use strict";
/**
 * @param bcrypt is a encripter passwords
 * import @module User for the use in this class
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var bcrypt = __importStar(require("bcrypt"));
var data_source_1 = require("../data-source");
var userRepository = data_source_1.AppdataSource.getRepository(User_1.User);
var saltRounds = 10; //this define the number of rounds of encriptacion
var UserController = /** @class */ (function () {
    function UserController() {
    }
    var _a;
    _a = UserController;
    UserController.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, name, lastName, email, password, age, gender, rolId, hashedPassword, user, error_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, name = _b.name, lastName = _b.lastName, email = _b.email, password = _b.password, age = _b.age, gender = _b.gender, rolId = _b.rolId;
                    hashedPassword = bcrypt.hashSync(password, saltRounds);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    user = new User_1.User();
                    user.name = name;
                    user.email = email;
                    user.lastName = lastName;
                    user.password = hashedPassword;
                    user.gender = gender;
                    user.age = age;
                    user.rol = rolId;
                    // this await saves the new created user and response with a code status 200 else response with an error
                    return [4 /*yield*/, userRepository.save(user)];
                case 2:
                    // this await saves the new created user and response with a code status 200 else response with an error
                    _c.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            message: "User was saved"
                        })];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: "An error has been ocurred: ".concat(error_1)
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var usersWithPass, users, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userRepository.find({
                            relations: {
                                rol: true,
                            },
                            where: { isActive: true }
                        })];
                case 1:
                    usersWithPass = _b.sent();
                    users = usersWithPass.map(function (user) {
                        var password = user.password, users = __rest(user, ["password"]);
                        return users;
                    });
                    /**
                     * in this part i am using the ternary operator, if the number of users is more than zero
                     * the cosole response with a json status code: 200 and show all users,
                     * else user less than zero || null responses with a new Error
                     */
                    return [2 /*return*/, users.length > 0
                            ? res.status(200).json({ ok: true, users: users })
                            : res.json({ ok: false, message: "User not found" })];
                case 2:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: "An error has been ocurred: ".concat(error_2),
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // gets the user by id, and i always continue using the ternary operator
    UserController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(_a, function (_b) {
            id = parseInt(req.params.id);
            try {
                /*
                var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
                const user = new User();
                
                var userEmail = user.email;
                if(userEmail = emai)
    */
            }
            catch (error) {
                return [2 /*return*/, res.json({
                        ok: false,
                        message: "An error has been ocurred: ".concat(error)
                    })];
            }
            return [2 /*return*/];
        });
    }); };
    // update the exist user
    UserController.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, name, lastName, age, email, gender, repoUser, user, error_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = parseInt(req.params.id);
                    _b = req.body, name = _b.name, lastName = _b.lastName, age = _b.age, email = _b.email, gender = _b.gender;
                    repoUser = data_source_1.AppdataSource.getRepository(User_1.User);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, repoUser.findOneOrFail({
                            where: { id: id, isActive: true }
                        })];
                case 2:
                    user = _c.sent();
                    if (!user) {
                        throw new Error("User dont exist in the data base");
                    }
                    user.name = name, user.lastName = lastName, user.email = email, user.gender = gender, user.age = age, user.password;
                    return [4 /*yield*/, repoUser.save(user)];
                case 3:
                    _c.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            message: "Data has been saved"
                        })];
                case 4:
                    error_3 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: "Server error!"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    //delete
    UserController.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = parseInt(req.params.id);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, userRepository.findOne({
                            where: { id: id, isActive: true }
                        })];
                case 2:
                    user = _b.sent();
                    console.log(user);
                    if (!user) {
                        res.json({
                            ok: "false",
                            message: "User doesn't exist in the data base"
                        });
                    }
                    user.isActive = false;
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            msg: "User was Deleted"
                        })];
                case 4:
                    error_4 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            msg: "Error: ".concat(error_4)
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    UserController.paginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, take, repoUser, _b, users, totalItems, totalPages, nextPage, prevPage, e_1;
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
                    repoUser = data_source_1.AppdataSource.getRepository(User_1.User);
                    return [4 /*yield*/, repoUser.findAndCount({
                            relations: { rol: true },
                            where: { isActive: true },
                            skip: (page - 1) * take,
                            take: take
                        })];
                case 2:
                    _b = _c.sent(), users = _b[0], totalItems = _b[1];
                    try {
                        if (users.length > 0) {
                            totalPages = totalItems / take;
                            if (totalPages % 1 !== 0) {
                                totalPages = Math.trunc(totalPages) + 1;
                            }
                            nextPage = page >= totalPages ? page : page + 1;
                            prevPage = page <= 1 ? page : page - 1;
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    msg: "Usuarios encontrados",
                                    users: users,
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
                                    msg: "No se encontraron usuarios",
                                    empty: true,
                                    ok: false
                                })];
                        }
                    }
                    catch (e) {
                        return [2 /*return*/, res.json({
                                ok: false,
                                error: "Error ".concat(e),
                                mesg: 'Ah ocurrido un error inesperado'
                            })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            error: "Error ".concat(e_1),
                            msg: 'Ah ocurrido un error inesperado'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
;
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map