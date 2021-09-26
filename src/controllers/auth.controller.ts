import passport from "passport";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import passportLocal from 'passport-local';



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
    const user = await getRepository(User).findOne({ email: email });

    if (user) {
        return res.status(400).json({ msg: "Email already exist" });
    }

    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.status(201).json({msg: "Succesfully saved"});
};