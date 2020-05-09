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
   *      summary: user regstration
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
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    const user = User.findOne({ where: { username: req.body.username } });
    if (!user) {
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
      return res.status(200).send({ newUser });
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
    passport.authenticate("local", function (err, user, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const token = jwt.sign({ username: user.username }, `${JWT_SECRET}`);

        return res.status(200).send({ token: token });
      }
    });
  }
}
