import { Router } from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;