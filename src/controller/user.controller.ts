/**
 * @param bcrypt is a encripter passwords
 * import @module User for the use in this class
 * 
 */

import { Request, Response } from "express";
import { User } from "../models/User";
import * as bcrypt from "bcrypt";
import { AppdataSource } from "../data-source";
import cors from 'cors';

const userRepository = AppdataSource.getRepository(User)
const saltRounds = 10; //this define the number of rounds of encriptacion

class UserController {
    static createUser = async (req: Request, res: Response) => {
        const { name, lastName, email, password, age, gender, rolId} = req.body;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

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
                where: {state: true}
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
            /*
            var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            const user = new User();
            
            var userEmail = user.email;
            if(userEmail = emai)
*/
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
        const { name, lastName, age, email, gender } = req.body;
        const repoUser = AppdataSource.getRepository(User);
        let user: User;

        // in this case find a one user, if the user is doesnt exist the update  will not run,
        //else find a One user and update that user
        try {
            user = await repoUser.findOneOrFail({
                where: { id, state: true }
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
                where: { id , state: true}
            });
            console.log(user);

            if (!user) {
                res.json({
                    ok: "false",
                    message:"User doesn't exist in the data base"
                })
            }
            
            user.state = false;
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
};

export default UserController;