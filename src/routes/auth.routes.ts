import { Router } from 'express';
import { authUser, createUser } from "../controllers/auth.controller";
const router = Router();

/**
 * route to log in an user
 */
router.post('/login', authUser);

/**
 * route to create a new user
 */
router.post('/register', createUser);

export default router;