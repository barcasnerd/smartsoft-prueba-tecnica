import { Request, Response } from "express";

export const authValidator = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status(401).json({ msg: "Please login o register first" });
    }
}