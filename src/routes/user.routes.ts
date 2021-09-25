import { Router } from 'express';
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.get('/users', getUsers);

// router.get('/users/:id', );
// router.post('/users', );
// router.put('/users', );
// router.delete('/users(:id', );

export default router;