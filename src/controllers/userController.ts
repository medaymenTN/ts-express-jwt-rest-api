import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../entity/user";
import { JWT_SECRET } from "../utils/secrets";

export class UserController {
  /**
   * @swagger
   * path:
   *  /api/register:
   *    post:
   *      summary: user registration
   *      tags: [users]
   *      parameters:
   *      - in: body
   *        name: user
   *        schema:
   *         type: object
   *         properties:
   *           username:
   *             type: string
   *           password:
   *             type: string
   *      responses:
   *        "200":
   *          description: user object
   *          content:
   *            application/json:
   *
   */
  public async registerUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      const newUser = new User();
      newUser.username = username;
      newUser.password = hashedPassword;
      const response = await User.save(newUser);
      return res.status(200).send({ response });
    }

    return res.status(200).send({ message: "user already exist" });
  }
  /**
   * @swagger
   * path:
   *  /api/login:
   *    post:
   *      summary: user login
   *      tags: [users]
   *      parameters:
   *      - in: body
   *        name: user
   *        schema:
   *         type: object
   *         properties:
   *           username:
   *             type: string
   *           password:
   *             type: string
   *      responses:
   *        "200":
   *          description: user object
   *          content:
   *            application/json:
   *
   */
  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (!user) {
        return res.status(401).json(info);
      } else {
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({ username: user.username }, String(JWT_SECRET));
        return res.json({ user: { username: user.username }, token });
      }
    })(req, res);
  }
}
