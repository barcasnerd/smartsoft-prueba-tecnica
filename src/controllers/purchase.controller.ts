import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { ProductPurchase } from "../entity/ProductPurchase";
import { Product } from "../entity/Product";

/**
 * Get a list of products saved on the user database table
 * @param req 
 * @param res 
 * @returns list of products
 */
export const getPurchases = async (req: Request, res: Response): Promise<Response> => {
    const products = await getRepository(ProductPurchase).find();
    return res.status(200).json(products);
};