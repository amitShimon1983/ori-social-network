
import 'reflect-metadata'
import express from 'express';
import { configureApp } from './app/configureApp';
import { appConfig } from './config';

const app = express();
const port = appConfig.port;

async function main() {
    const httpServer = await configureApp(app, appConfig);
    httpServer.listen(port, async () => {
        console.log(`app listening on port ${port}`)
    });
}

main();