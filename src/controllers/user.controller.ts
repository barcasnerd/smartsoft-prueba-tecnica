import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entity/User";

/**
 * Get a list of users saved on the user database table
 * @param req 
 * @param res 
 * @returns list of users
 */
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};

/**
 * Create an user, then save it into the user database table
 * @param req 
 * @param res 
 * @returns the saved user
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
};

/**
 * Gets an user based on the reques id
 * @param req 
 * @param res 
 * @returns an user by id
 */
export const getUser = async (req: Request, res: Response): Promise<Response> => {
        const result = await getRepository(User).findOne(req.params.id);
        return res.json(result);    
};

/**
 * Update an user basedn on request id and its changes
 * @param req 
 * @param res 
 * @returns user with changes
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }
    return res.status(404).json({msg: "User not found"});
};

/**
 * delete an user based on its id
 */
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(User).delete(req.params.id);
    return res.json(result);    
};
