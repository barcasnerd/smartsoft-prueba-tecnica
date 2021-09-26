import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { ProductPurchase } from "../entity/ProductPurchase";
import { Product } from "../entity/Product";

/**
 * Get a list of purchases saved on the purchases database table
 * @param req 
 * @param res 
 * @returns list of purchases
 */
export const getPurchases = async (req: Request, res: Response): Promise<Response> => {
    const currentUser = JSON.stringify(req.user);
    const user = JSON.parse(currentUser);
    
    const purchases = await getRepository(ProductPurchase).find();
    return res.status(200).json(purchases);
};
