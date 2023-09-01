/**
 * @param bcrypt encipts the user password
 * @param AppdataSource is an instance of data souce import
 * @param async codigo asincrono para poder esperar que termine una tarean junto con @param await
 */

import { User } from "../models/User"
import { Request, Response } from "express"
import { AppdataSource } from "../data-source"
import * as bcrypt from 'bcrypt';
import { tokenSign } from "../helper/jwt.helper";


const userRepository = AppdataSource.getRepository(User);
let token = '';
class userAuthentificator {
    static loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await userRepository.findOne({ where: { email } });

            if (user && bcrypt.compareSync(password, user.password)) {

                token = await tokenSign(user);
                return res.status(200).json({
                    ok: true,
                    message: "login successful",
                    token
                });

            } else {
                return res.status(401).json({
                    ok: false,
                    message: "invalid credentials"
                });
            }
        } catch (Error) {
            return res.status(500).json({
                ok: false,
                message: `An error has ocurred: ${Error}`
            })
        }
    }

    static logoutUser = async (req: Request, res: Response) => {
        var takeToken = token;
        try {
            if (takeToken != null || takeToken == ' ') {
                return res.status(403).json({
                    ok: false,
                    message: "The token isnt exist"
                })
            } else {
                takeToken = null;
            }
        } catch (e) {
            console.error(`An error has been ocurred \n${e}`);
        } finally {
            console.error("The isnt not found");
        }
    }
}


export default userAuthentificator;