import { Router } from "express";
import RolController from "../controller/rol.controller";

const router = Router();
const rol = RolController;

router.post("/", rol.createRol);
router.get("/pagination", rol.paginRol);
router.get("/", rol.getRol);
router.get("/:id", rol.getById);
router.put("/:id", rol.updateRol);
router.delete("/:id", rol.deleteRol);


export default router;