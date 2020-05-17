import { Request, Response } from 'express';
import { Product } from '../entity/product';
import { getConnectionManager } from 'typeorm';
export class ProductController {
    public async addProdcut(req: Request, res: Response) {
        try {
            const { name, price } = req.body;
            console.log(req.body);
            const manager = getConnectionManager().get('default');
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

    public async allProdcuts(req: Request, res: Response) {
        try {
            const manager = getConnectionManager().get('default');
            const entityManager = manager.getRepository<Product>(Product);
            const response = entityManager.find({});
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}
