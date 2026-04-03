import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({passReqToCallback: true} ,async function verify(req, username, password, callback) {
        const { session } = req as any;
        if(session?.messages?.length) {
            session.messages = [];
        }
        const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });
        if (!user) {
            // throw new Error(`Username: ${username} not found`);
            return callback(null, false, { message: `Username: ${username} not found` });
        }
        //check if password is correct
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: "Invalid password" });
        }
        return callback(null, user as any);
    }));

    passport.serializeUser(function(user: any, cb) {
        return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
        });
    });

    passport.deserializeUser(async function(user: any, cb) {
        const { id } = user;
        const userInDB: any = await getUserWithRoleById(id); 
        const sumCart = await getUserSumCart(id);
        return cb(null, {...userInDB, sumCart : sumCart});
    });
}

export default configPassportLocal;