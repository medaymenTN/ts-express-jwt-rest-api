import { Request, Response } from "express";
import { Product } from "../entity/product";
import { getConnectionManager } from "typeorm";
export class ProductController {
  /**
   * @swagger
   * tags:
   *   name: products
   *   description: product management
   */

  /**
   * @swagger
   * path:
   *  /api/product/create:
   *    post:
   *      summary: creates a product
   *      tags: [products]
   *      parameters:
   *      - in: body
   *        name: product
   *        schema:
   *         type: object
   *         properties:
   *           name:
   *             type: string
   *           price:
   *             type: number
   *      responses:
   *        "200":
   *          description: product objects
   *          content:
   *            application/json:
   *
   */
  public async addProdcut(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      console.log(req.body);
      const manager = getConnectionManager().get("default");
      const entityManager = manager.getRepository<Product>(Product);
      const response = await entityManager.create({
        name,
        price,
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  /**
   * @swagger
   * path:
   *  /api/product/all:
   *    get:
   *      summary: Get all products
   *      tags: [products]
   *      responses:
   *        "200":
   *          description: product objects
   *          content:
   *            application/json:
   *
   */
  public async allProdcuts(req: Request, res: Response) {
    try {
      const manager = getConnectionManager().get("default");
      const entityManager = manager.getRepository<Product>(Product);
      const response = entityManager.find({});
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
