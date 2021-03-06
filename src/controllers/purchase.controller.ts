import { Request, Response } from 'express';
import { getRepository, getManager } from "typeorm";
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
    // manage typeorm queries
    const manager = getManager()

    const currentUser = await getRepository(User).findOne(req.user); // get the current user

    const { products } = req.body; // the purchase request recieves a list of product ids only
    const productList = await manager.createQueryBuilder(Product, "product") // then get all products with those ids
        .where("product.id IN (:...products)", { products: products })
        .getMany();

    let total = 0; // define the total ammount of the purchase
    productList.forEach((product) => { // to iterate all elements of the purchase
        total += product.price * product.quantity; // get the price by each product based on its price and quantity
    });

    // reduce the current money of the logged user
    if (currentUser && currentUser.money - total > 0) {
        // edit the user ammount badge
        await getRepository(User).merge(currentUser, {
            money: currentUser.money - total
        });
        // save the updated user
        await getRepository(User).save(currentUser);
    } else {
        return res.status(400).json({ msg: "Insufficient money" });
    }

    // then create the actual purchase to save it into database
    const newPurchase = await getRepository(ProductPurchase).create({
        user: currentUser,
        products: productList,
        total: total
    });

    const result = await getRepository(ProductPurchase).save(newPurchase);
    if (result) {
        return res.status(201).json(result);
    }
    return res.status(400).json({ msg: "Failed to save purchase" });
};

/**
 * Gets a purchase based on the request id
 * @param req 
 * @param res 
 * @returns a purchase
 */
export const getPurchase = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(ProductPurchase).findOne(req.params.id);
    if (result) {
        return res.status(302).json(result);
    }
    return res.status(404).json({ msg: "Purchase id not found" });
};


/**
 * delete a purchase based on its id
 */
export const deletePurchase = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(ProductPurchase).delete(req.params.id);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "Purchase id not found" });
};


/**
 * Update an purchase based on request id and a product list
 * @param req 
 * @param res 
 * @returns updated purchase
 */
export const updatePurchase = async (req: Request, res: Response): Promise<Response> => {
    // manage typeorm queries
    const manager = getManager()

    const purchase = await getRepository(ProductPurchase).findOne(req.params.id); // purchase requested

    if (purchase) { // purchase existance verifying
        const { products } = req.body; // the purchase request recieves a list of product ids only
        const productList = await manager.createQueryBuilder(Product, "product") // then get all products with those ids
            .where("product.id IN (:...products)", { products: products })
            .getMany();

        let total = 0; // define the total ammount of the purchase
        productList.forEach((product) => { // to iterate all elements of the purchase
            total += product.price * product.quantity; // get the price by each product based on its price and quantity
        });

        // update the purchase
        await getRepository(ProductPurchase).merge(purchase, {
            products: productList,
            total: total
        });

        // then save the purchase into database
        const result = getRepository(ProductPurchase).save(purchase);
        return res.status(200).json(result);
    }

    return res.status(404).json({ msg: "Purchase id not found" });

};