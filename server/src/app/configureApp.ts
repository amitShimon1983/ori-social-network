import { Configuration } from "../model"
import express, { Express } from 'express';
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middleware";
import configureRoutes from "./route";
export const configureApp = async (app: Express, appConfig: Configuration) => {
    app.use(cookieParser());
    app.use(express.json({ limit: '50mb' }));
    app.use(corsMiddleware(app, { allowedOrigins: appConfig.allowedOrigins }));
    configureRoutes(app)
}