import { Router } from "express";
import { UserController } from "../controllers/userController";
import { User } from "../entity/user";

const userRouter: Router = Router();
const userController: UserController = new UserController();

// For TEST only ! In production, you should use an Identity Provider !!
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.authenticateUser);

export default userRouter;
