import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/productController";
import { AuthController } from "../controllers/authController";

const productRouter: Router = Router();
const productController: ProductController = new ProductController();
const authController: AuthController = new AuthController();

// For TEST only ! In production, you should use an Identity Provider !!
productRouter.post(
  "/create",
  authController.authorizeJWT,
  productController.addProdcut
);
productRouter.get(
  "/all",
  authController.authorizeJWT,
  productController.allProdcuts
);

export default productRouter;
