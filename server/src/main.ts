
import 'reflect-metadata'
import express from 'express';
import { configureApp } from './app/configureApp';
import { appConfig } from './config';

const app = express();
const port = appConfig.port;

async function main() {
    app.listen(port, async () => {
        await configureApp(app, appConfig);
        console.log(`app listening on port ${port}`)
    });
}

main();