import { User } from "../models/User";
import jwt from "jsonwebtoken"

export const tokenSign = async (user: User) => {
    const token = jwt.sign({
        _id: user.id,
        email: user.email,
        rol: user.rolId
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    )
    return token;
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (Error) {
        return null;
    }
}