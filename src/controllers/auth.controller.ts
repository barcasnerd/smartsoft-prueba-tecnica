import passport from "passport";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

/**
 * authenticate an user using local strategy
 */
export const authUser = passport.authenticate('local', (req: Request, res: Response) => {
    res.json({ msg: "Succesfully logged in" });
});

/**
 * create a new user if don't exist
 * @param req 
 * @param res 
 * @returns res
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await getRepository(User).findOne({ email: email });

    if (user) {
        return res.status(400).json({ msg: "Email already exist" });
    }

    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.status(201).json(results);
};