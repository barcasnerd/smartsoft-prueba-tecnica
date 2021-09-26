import passport from "passport";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import passportLocal from 'passport-local';
import config from "../config/config";


// create local strategy from passport
const LocalStrategy = passportLocal.Strategy;

/**
 * authenticate an user credentials
 */
passport.use(new LocalStrategy({ usernameField: "email" }, async (email: string, password: string, done) => {
    const user = await getRepository(User).findOne({ email: email, password: password });
    if (user) {
        return done(null, { id: user.id });
    }
    done(null, false);
}));


/**
 * reduces the size of the user context by using a single parameter
 */
passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});


/**
 * recreate the entire user based on an id
 */
passport.deserializeUser<any, any>(async (id, done) => {
    let user = await getRepository(User).findOne(id);
    done(null, user);
});


/**
 * authenticate an user using local strategy
 */
export const authUser = passport.authenticate('local');


/**
 * create a new user if don't exist
 * @param req 
 * @param res 
 * @returns res
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (email === config.admin_EMAIL) return res.status(400).json({ msg: "Email already exist" });

    const user = await getRepository(User).findOne({ email: email });

    if (user) {
        return res.status(400).json({ msg: "Email already exist" });
    }

    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.status(201).json({ msg: "Succesfully saved" });
};

/**
 * update the current logged user
 * @param req 
 * @param res 
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.user);
    if (user) {
        await getRepository(User).merge(user, req.body);
        const result = await getRepository(User).save(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "user not found" });
}

/**
 * get list of users (only a basic admin)
 * @param req 
 * @param res 
 */
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    if (email == config.admin_EMAIL && password == config.admin_PASSWORD) {
        const result = await getRepository(User).find();
        return res.status(200).json(result);
    }
    return res.status(401).json({ msg: "Access for admin only" })
}