import passport from 'passport';
import passportLocal from 'passport-local';
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const user = await getRepository(User).findOne({ email: email, password: password });
    if (user) {
        return done(null, { id: user.id });
    }
    done(null, false);
}));


passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser<any, any>(async (id, done) => {
    let user = await getRepository(User).findOne(id);
    done(null, user);
});

export const authUser = passport.authenticate('local', (req, res)=>{
    res.json({msg: "Succesfully logged in"});
});