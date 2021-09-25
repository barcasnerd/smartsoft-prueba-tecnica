import { Router } from 'express';
import { getUsers, createUser } from "../controllers/user.controller";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', createUser);


// router.post('/users', );
// router.put('/users', );
// router.delete('/users(:id', );

export default router;