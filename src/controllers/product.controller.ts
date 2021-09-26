import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";

/**
 * Get a list of products saved on the user database table
 * @param req 
 * @param res 
 * @returns list of products
 */
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const products = await getRepository(Product).find();
    return res.status(200).json(products);
};

/**
 * Create an product, then save it into the product database table
 * @param req 
 * @param res 
 * @returns the saved product
 */
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const newproduct = getRepository(Product).create(req.body);
    const results = await getRepository(Product).save(newproduct);
    return res.status(201).json(results);
};

/**
 * Gets an product based on the reques id
 * @param req 
 * @param res 
 * @returns an product by id
 */
export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Product).findOne(req.params.id);
    if (result) {
        return res.status(302).json(result);
    }
    return res.status(404).json({ msg: "Product not found" });
};

/**
 * Update an product basedn on request id and its changes
 * @param req 
 * @param res 
 * @returns product with changes
 */
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const product = await getRepository(Product).findOne(req.params.id);
    if (product) {
        getRepository(Product).merge(product, req.body);
        const results = await getRepository(Product).save(product);
        return res.status(200).json(results);
    }
    return res.status(404).json({ msg: "Product not found" });
};

/**
 * delete an product based on its id
 */
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(Product).delete(req.params.id);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "Product not found" });
};
