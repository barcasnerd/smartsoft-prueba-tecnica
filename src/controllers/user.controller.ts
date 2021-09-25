import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entity/User";

/**
 * Get users from database
 * @param req 
 * @param res 
 */
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};

