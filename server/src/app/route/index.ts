import { Application, Request, Response } from 'express';
import { authRouter, fileUpload } from '../../api';
import { authenticateRequestMiddleware } from '../middleware/authenticationMiddleware';


const configureRoutes = (app: Application) => {
    app.use('/api/auth', authRouter)
    app.use('/api/file', async (req: Request, res: Response, next) => {
        await authenticateRequestMiddleware(req.cookies.user)
        next();
    }, fileUpload)
};


export default configureRoutes;