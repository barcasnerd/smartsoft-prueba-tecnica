import { Router } from 'express';
import { authUser, createUser, updateUser } from "../controllers/auth.controller";
import { Request, Response } from "express";
import { authValidator } from "../middlewares/authValidator";
const router = Router();

/**
 * route to log in an user
 */
router.post('/login', authUser, (req: Request, res: Response) => {
    res.status(200).json({ msg: "Logged in" })
});

/**
 * route to create a new user
 */
router.post('/register', createUser);

/**
 * update user information
 */
router.put('/setting', authValidator, updateUser);

/**
 * update user information
 */
 router.get('/users', authValidator, getUsers);

export default router;