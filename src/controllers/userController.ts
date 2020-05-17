import bcrypt from 'bcrypt-nodejs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import '../auth/passportHandler';
import { User } from '../entity/user';
import { JWT_SECRET } from '../utils/secrets';

export class UserController {
    /**
     * @api {post} /api/register Register user
     * @apiName RegisterUser
     * @apiGroup User
     * @apiParam {String} username
     * @apiParam {String} password
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id":"1"
     *       "username": "aymen",
     *       "password": "encrypted"
     *     }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "user already exist"
     *     }
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

        return res.status(400).send({ error: 'user already exist' });
    }
    /**
     * @api {post} /api/login Authenticate user
     * @apiName UserAuth
     * @apiGroup User
     * @apiParam {String} username
     * @apiParam {String} password
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "user": {"username":"aymen"},
     *       "token": "jwtaccesstoken"
     *     }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "error": "user {aymen} not found"
     *     }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401
     *     {
     *       "error": "Invalid  password"
     *     }
     *
     */
    public authenticateUser(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
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
