export class Configuration {
    serverUrl?: string;
    signUpEndpoint?: string;
    loginEndpoint?: string;
    constructor() {
        this.serverUrl = process.env.REACT_APP_SERVER_URL;
        this.signUpEndpoint = process.env.REACT_APP_SIGN_UP;
        this.loginEndpoint = process.env.REACT_APP_LOGIN;
    }
}