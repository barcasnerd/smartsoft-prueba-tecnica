import passport from 'passport';
import passportLocal from 'passport-local';
import { getRepository } from "typeorm";
import { User } from "../entity/User";

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