import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/userModel.js";

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = (jwt_payload, done) => {
  const { sub } = jwt_payload;
  try {
    const user = UserModel.findById(sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

const strategy = new JwtStrategy(options, verify);

export const passportConfig = () => {
  passport.use(strategy);
};
