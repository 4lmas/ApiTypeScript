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
        const { rol } = req.body;

        try {
            const role = new Rol();
            role.rol = rol;
        

            await userRepository.save(role);

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
        const { rol } = req.body;
        const repoRol = AppdataSource.getRepository(Rol);
        let role: Rol;

        try {
            role = await userRepository.findOneOrFail({
                where: { id, isActive: true }
            })

            if (!rol) {
                throw new Error("El usuario no existe!")
            }
            role.rol = rol;
            await repoRol.save(role);
            return res.status(200).json({
                ok: true,
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

    static paginRol = async (req: Request, res: Response) => {
        let page = req.query.page || 1;
        page = Number(page);
        let take = req.query.take || 5;
        take = Number(take);

        try {
            const repoRol = AppdataSource.getRepository(Rol);
            const [roles, totalItems] = await repoRol.findAndCount({
                where: { isActive: true },
                skip: (page -1) * take,
                take
            });

            try {
                if (roles.length > 0){
                    let totalPages: number = totalItems / take

                    if (totalPages % 1 !== 0){
                        totalPages = Math.trunc(totalPages) + 1;
                    }

                    let nextPage: number = page >= totalPages ? page : page + 1;
                    let prevPage: number = page <= 1 ? page : page -1;

                    return res.json({
                        ok: true,
                        msg: "Roles encontrados",
                        roles,
                        totalItems,
                        totalPages,
                        currentPage: page,
                        nextPage,
                        prevPage,
                        empty: true,
                        take
                    });
                } else {
                    return res.json({
                        ok: false,
                        message: "No se encontraron roles",
                        empty: false
                    })
                }
            } catch (e) {
                return res.json({
                    ok: false,
                    error: `Error \n${e}`,
                    message: 'Ah ocurrido un error'
                })
            }
        } catch (e) {
            return res.json({
                ok: false,
                error: `Error \n${e}`,
                message: 'Ah ocurrido un error iesperado'
            })
        }
    }
};

export default RolController;