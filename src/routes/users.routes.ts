import { Router } from "express";
import UserController from "../controller/user.controller";
import userAuthentificator from "../auth/login.controller";

const router = Router()
const user = UserController;
const auth = userAuthentificator;
// methos for redirections

router.post("/", user.createUser);
router.get("/pagination", user.paginUser);

router.get("/", user.getUser);
router.put("/:id", user.updateUser);
router.get("/:id", user.getById);
//router.post("/login", user.loginUser);
router.delete("/:id", user.deleteUser);
router.post("/login", auth.loginUser);

export default router;