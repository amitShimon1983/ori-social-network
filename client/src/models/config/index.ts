export class Configuration {
    serverUrl?: string;
    signUpEndpoint?: string;
    loginEndpoint?: string;
    logoutEndpoint?: string;
    uploadEndpoint?: string;
    refreshEndpoint?: string;
    constructor() {
        this.serverUrl = process.env.REACT_APP_SERVER_URL;
        this.signUpEndpoint = process.env.REACT_APP_SIGN_UP;
        this.loginEndpoint = process.env.REACT_APP_LOGIN;
        this.logoutEndpoint = process.env.REACT_APP_LOGOUT;
        this.uploadEndpoint = process.env.REACT_APP_UPLOAD;
        this.refreshEndpoint = process.env.REACT_APP_REFRESH;
    }
}