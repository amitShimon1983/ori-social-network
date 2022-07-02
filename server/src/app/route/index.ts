import { Application } from 'express';
import { router } from '../../api';

const configureRoutes = (app: Application) => {
    app.use('/', router)
};


export default configureRoutes;