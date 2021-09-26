import { Router } from 'express';
import { authUser } from "../controllers/auth.controller";
const router = Router();

router.post('/login', authUser);
router.post('register', );

export default router;