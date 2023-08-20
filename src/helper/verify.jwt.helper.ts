import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt.helper";

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData) {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                errorMessage: "Access denied"
            });
        }
    } catch (error) {
        console.error("Error in checkAuth:", error);
        return res.status(500).json({
            ok: false,
            errorMessage: "Internal server error"
        });
    }
};
