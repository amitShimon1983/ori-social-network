import 'dotenv/config';

export class Configuration {
    port: string | undefined;
    dbConnectionString: string | undefined;
    allowedOrigins: string[];
    secret?: string;
    apolloServerPath?: string;

    constructor() {
        this.port = process.env.PORT;
        this.dbConnectionString = process.env.DB_CONNECTION_STRING;
        this.secret = process.env.SECRET;
        this.allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
        this.apolloServerPath = process.env.APOLLO_SERVER_PATH;
    }

}