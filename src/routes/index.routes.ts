import dotenv from "dotenv";
import { Router } from "express";
import routerUser from "./users.routes";
import routerRol from "./rol.routes"

// these imports are very important for the use this file and another functions of system
dotenv.config()
const URL = process.env.URL

const routes = Router();

routes.use(`${URL}/user`, routerUser)
routes.use(`${URL}/rol`, routerRol)

export default routes;