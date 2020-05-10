import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { JWT_SECRET } from "../utils/secrets";
import { User } from "../entity/user";
import bcrypt from "bcrypt-nodejs";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      const user = await User.findOne({
        username: username,
      });

      if (!user)
        return done(undefined, false, {
          message: `username ${username} not found.`,
        });

      bcrypt.compare(
        password,
        user.password,
        (err: Error, isMatch: boolean) => {
          if (isMatch) {
            return done(undefined, user);
          } else {
            return done(undefined, false, {
              message: "Invalid  password.",
            });
          }
        }
      );
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtToken, done) => {
      User.findOne({ username: jwtToken.username }).then((user) => {
        if (!user) {
          return done(false);
        }
        if (user) {
          return done(undefined, user, jwtToken);
        } else {
          return done(undefined, false);
        }
      });
    }
  )
);
