import { Application, NextFunction, Request, Response } from "express"
import { CorsMiddlewareOptions } from "../../model/cors"
import cors from 'cors';

const corsOptions = (whiteList: string[]) => (req: any, callback: any) => {
    const getOriginValue = () => whiteList.find((origin: string) => origin === req.header('origin'))
    const options = {
        origin: getOriginValue(),
        credential: true,
    }
    callback(null, options)
}

export default (app: Application, options: CorsMiddlewareOptions) => {
    const { allowedOrigins } = options;
    app.use('*', cors(corsOptions(allowedOrigins)));
    app.options('*', cors(corsOptions(allowedOrigins)));
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.origin && allowedOrigins.includes(req.headers.origin)) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }
        res.setHeader('Access-Control-Allow-Method', 'GET, OPTIONS, PUT, PATCH, DELETE, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, *');
        res.setHeader('Access-Control-Allow-Credential', 'true');
        res.setHeader('Cache-Control', 'no-store,no-cache, must-revalidate');
        res.setHeader('Vary', 'Origin');
        return next();
    }
}