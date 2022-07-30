import { Application } from 'express';
import { authRouter, fileUpload } from '../../api';


const configureRoutes = (app: Application) => {
    app.use('/api/auth', authRouter)
    app.use('/api/file', fileUpload)
};


export default configureRoutes;