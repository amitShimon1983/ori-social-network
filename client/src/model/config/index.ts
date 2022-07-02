export class Configuration {
    serverUrl?: string;
    signUpEndpoint?: string;
    constructor() {
        this.serverUrl = process.env.REACT_APP_SERVER_URL;
        this.signUpEndpoint = process.env.REACT_APP_SIGN_UP;
    }
}