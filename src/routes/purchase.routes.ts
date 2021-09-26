import { Router } from 'express';
import { getPurchases, createPurchase } from "../controllers/purchase.controller";
//import { getPurchases, createPurchase, getPurchase, updatePurchase, deletePurchase } from "../controllers/purchase.controller";

const router = Router();

router.get('/', getPurchases);
router.post('/', createPurchase);
// router.get('/:id', getPurchase);
// router.put('/:id', updatePurchase);
// router.delete('/:id', deletePurchase);

export default router;