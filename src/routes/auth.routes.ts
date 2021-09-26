import { Router } from 'express';
import { authUser, createUser } from "../controllers/auth.controller";
import { Request, Response } from "express";
const router = Router();

/**
 * route to log in an user
 */
router.post('/login', authUser, (req: Request, res: Response) => {
    res.status(200).json({msg: "Logged in"})
});

/**
 * route to create a new user
 */
router.post('/register', createUser);

export default router;