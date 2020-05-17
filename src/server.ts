import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routing';
import swaggerUi from 'swagger-ui-express';
import * as specs from './swagger/swagger-config';
import { postgresConnect } from './dbConnection';

export class Server {
    private static readonly PORT: any = process.env.PORT || 5000;
    private app: express.Application;
    private port: number | string;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.port = Server.PORT;
        this.listen();
        this.routes();
        postgresConnect();
        this.swaggerConfig();
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`server is running on port ${this.port}`);
        });
    }
    private routes(): void {
        this.app.use('/api', routes.userRouter);
        this.app.use('/api/product', routes.productRouter);
        this.app.get('/', (req, res) => res.json('server running...!!'));
    }

    private swaggerConfig() {
        this.app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(specs.default));
    }

    public getApp(): express.Application {
        return this.app;
    }
}
