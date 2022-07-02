
import express from 'express';
import mongoose from 'mongoose';
import { configureApp } from './app/configureApp';
import { appConfig } from './config';

const app = express();
const port = appConfig.port;

async function main() {
    configureApp(app, appConfig);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
}


main().then(() => {


});