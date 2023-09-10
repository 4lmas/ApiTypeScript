/**
 * @param bcrypt is a encripter passwords
 * import @module User for the use in this class
 * 
 */

import { Request, Response } from "express";
import { User } from "../models/User";
import * as bcrypt from "bcrypt";
import { AppdataSource } from "../data-source";
import { Rol } from "../models/Rol";

const userRepository = AppdataSource.getRepository(User)
const saltRounds = 10; //this define the number of rounds of encriptacion

class UserController {
    static createUser = async (req: Request, res: Response) => {
        const { name, lastName, email, password, age, gender, rolId} = req.body;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword);
        /* 
        create a new Object user with an instance new User();
        and asign the values in the every case 
        */
        try {
            const user = new User();
            user.name = name;
            user.email = email;
            user.lastName = lastName;
            user.password = hashedPassword;
            user.gender = gender;
            user.age = age;
            user.rol = rolId;
            
            // this await saves the new created user and response with a code status 200 else response with an error
            await userRepository.save(user);
            return res.status(200).json({
                ok: true,
                message: "User was saved"
            });
        } catch (error) {
            return res.json({
                ok: false,
                message: `An error has been ocurred: ${error}`
            })
        }
    };

    static getUser = async (req: Request, res: Response) => {
        try {
            
            // this constant get the relations between User && Rol while state is equals true
            const usersWithPass = await userRepository.find({
                relations: {
                    rol: true,
                },
                where: {isActive: true}
            })

            const users = usersWithPass.map(user => {
                const { password, ... users } = user
                return users;
            })

            /**
             * in this part i am using the ternary operator, if the number of users is more than zero
             * the cosole response with a json status code: 200 and show all users,
             * else user less than zero || null responses with a new Error
             */
            return users.length > 0
                ? res.status(200).json({ ok: true, users })
                : res.json({ ok: false, message: "User not found" })
        } catch (error) {
            return res.json({
                ok: false,
                message: `An error has been ocurred: ${error}`,
            });
        }
    }

    // gets the user by id, and i always continue using the ternary operator

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
        } catch (error) {
            return res.json({
                ok: false,
                message: `An error has been ocurred: ${error}`
            });
        }
    }

    // update the exist user

    static updateUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        //this array gets the data of the models
        const { name, lastName, age, email, gender, rolId } = req.body;
        const repoUser = AppdataSource.getRepository(User);
        let user: User;
        let rol: Rol;
        try {
            user = await repoUser.findOneOrFail({
                where: { id, isActive: true }
            })

            if (!user) {
                throw new Error("User dont exist in the data base");
            }
                user.name = name,
                user.lastName = lastName,
                user.email = email,
                user.gender = gender,
                user.age = age,
                user.password,
                user.rol = rolId;
                
                await repoUser.save(user);
            return res.status(200).json({
                ok: true,
                message: "Data has been saved"
            });
        } catch (error){
            return res.json({
                ok: false,
                message: "Server error!"
            })
        }
    };

    //delete

    static deleteUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        
        
        try {
            const user = await userRepository.findOne({
                where: { id , isActive: true}
            });
            console.log(user);

            if (!user) {
                res.json({
                    ok: "false",
                    message:"User doesn't exist in the data base"
                })
            }
            
            user.isActive = false;
            await userRepository.save(user);
            return res.status(200).json({
                ok: true,
                msg: "User was Deleted"
            });
        } catch (error) {
            return res.json({
                ok: false,
               msg: `Error: ${error}`
            });
        }
    }; 


    static paginUser = async(req: Request, res: Response)=>{
        let page = req.query.page || 1;
        page = Number(page);
        let take = req.query.take || 5;
        take = Number(take);

        try {
            

            const repoUser = AppdataSource.getRepository(User);
            const [users, totalItems] = await repoUser.findAndCount({
                relations: { rol: true},
                where: { isActive: true},
                skip: (page -1) * take,
                take
            });
            try {
                if (users.length > 0){
                    let totalPages: number = totalItems / take;

                    if (totalPages % 1 !== 0) {
                        totalPages = Math.trunc(totalPages) + 1;
                    }

                    let nextPage: number = page >= totalPages ? page : page + 1;
                    let prevPage: number = page <= 1 ? page : page -1;

                    const userWithoutPass = users.map(user => {
                        const { password, ...userWithoutPass } = user
                        return userWithoutPass
                    })

                    return res.json({
                        ok: true,
                        msg: "Usuarios encontrados",
                        users: userWithoutPass,
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
                        msg: "No se encontraron usuarios",
                        empty: true,
                        ok: false
                    });
                }
            } catch (e) {
                return res.json({
                    ok: false,
                    error: `Error ${e}`,
                    mesg: 'Ah ocurrido un error inesperado'
                });
            }
        } catch (e) {
            return res.json({
                ok: false,
                error: `Error ${e}`,
                msg: 'Ah ocurrido un error inesperado'
            });
        }
    }    
};

export default UserController;

