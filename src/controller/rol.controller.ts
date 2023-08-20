/**
 * import @module Rol for the use in this part
 * import @param Request && @param Response from express
 * @class <RolController> is used for createRol, getRol, getByIdRol, updateRol && deleteRol
 * and finally exports the class
 */


import { Request, Response } from "express";
import { Rol } from "../models/Rol";
import { AppdataSource } from "../data-source";

const userRepository = AppdataSource.getRepository(Rol);

class RolController {
    static createRol = async (req: Request, res: Response) => {
        const { typeRol, description } = req.body;

        try {
            const rol = new Rol();
            rol.typeRol = typeRol;
            rol.description = description;

            await userRepository.save(rol);

            return res.status(200).json({
                ok: true,
                message: "The rol has been saved!"
            });
        } catch (error) {
            return res.json({
                ok: false,
                errorMessage: `An error has been ocurred: ${error}`
            })
        };
    };

    static getRol = async (req: Request, res: Response) => {
        try {
            const rol = await userRepository.find({
                where: { isActive: true }
            })

            return rol.length > 0
                ? res.status(200).json({ ok: true, rol })
                : res.json({ ok: false, ErrorMessage: `Rol not found` })
        } catch (error) {
            return res.json({
                ok: false,
                errorMessage: `An error ocurred: ${error}`
            })
        }
    };

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const rol = await userRepository.findOne({
                where: { id, isActive: true },
            });
            return rol ? res.status(200).json({ ok: true, rol })
                : res.json({ ok: false, ErrorMEsage: "rol no encontrado" })
        } catch (error) {
            res.json({
                ok: false,
                errorMessage: `Error ocurred while search: ${error}`
            })
        }
    }

    static updateRol = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { typeRol, description } = req.body;
        const repoRol = AppdataSource.getRepository(Rol);
        let rol: Rol;

        try {
            rol = await userRepository.findOneOrFail({
                where: { id, isActive: true }
            })

            if (!rol) {
                throw new Error("El usuario no existe!")
            }
            rol.typeRol = typeRol;
            rol.description = description;
            await repoRol.save(rol);
            return res.status(200).json({
                ok: 200,
                message: "Operation is succesfull"
            });
        } catch (error) {
            return res.json({
                ok: false,
                errorMessage: "server error"
            });
        }
    };

    static deleteRol = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoRol = AppdataSource.getRepository(Rol);
        try{
            const rol = await repoRol.findOne({
                where: { id }
            });
            console.log(rol);

            if (!rol) {
                throw new Error("Rol doesn't exist in the data base");
            }
            rol.isActive = false;
            await repoRol.save(rol);
            return res.status(200).json({
                ok:true,
                message: "The user was deleted"
            });
        } catch (error) {
            return res.json({
                ok: false,
                message: "Server Error"
            });
        }
    };
};

export default RolController;