import { Request, Response } from 'express';
import { getRepository, getManager} from "typeorm";
import { ProductPurchase } from "../entity/ProductPurchase";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

/**
 * Get a list of purchases of the current user saved on the purchases database table
 * @param req 
 * @param res 
 * @returns list of purchases 
 */
export const getPurchases = async (req: Request, res: Response): Promise<Response> => {
    const currentUser = JSON.stringify(req.user);
    const user = JSON.parse(currentUser);

    const purchases = await getRepository(ProductPurchase).find({ user: user });

    return res.status(200).json(purchases);
};


/**
 * Create a purchase, then save it into the product database table
 * @param req 
 * @param req 
 * @param res 
 * @returns the saved purchase
 */
export const createPurchase = async (req: Request, res: Response): Promise<Response> => {
    const manager = getManager()
    const currentUser = await getRepository(User).findOne(req.user);

    const { products } = req.body;
    const productList = await manager.createQueryBuilder(Product, "product")
        .where("product.id IN (:...products)", { products: products})
        .getMany();

};