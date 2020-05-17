import { Router, Request, Response } from 'express';
import path from 'path';
const docsRoutes: Router = Router();

// For TEST only ! In production, you should use an Identity Provider !!
docsRoutes.get('/docs', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../../docs/api/index.html'));
});

export default docsRoutes;
