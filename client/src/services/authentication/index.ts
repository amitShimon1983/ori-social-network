import { httpService } from "..";
import { appConfig } from "../../configuration";

class AuthenticationService {
    private static instance: AuthenticationService
    static getInstance() {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService()
        }
        return this.instance;
    }

    async logout(onSuccess?: (value?: any) => void) {
        const url = `${appConfig.serverUrl}${appConfig.logoutEndpoint}`
        const res: any = await httpService.post(url);
        localStorage.setItem('user', '');
        if (typeof onSuccess === 'function') { onSuccess(res) }
    }

    async refresh(onSuccess?: (value: any) => void, onError?: () => void) {
        const url = `${appConfig.serverUrl}${appConfig.refreshEndpoint}`
        const res: any = await httpService.get(url);
        if (res?.isAuthenticate) {
            this._onAuthenticationSuccess(res, onSuccess);
        } else {
            if (typeof onError === 'function') { onError(); }
        }
    }

    async login(data: { [key: string]: any }, onSuccess: (value: any) => void, onError?: (value: string[]) => void) {
        const url = `${appConfig.serverUrl}${appConfig.loginEndpoint}`
        const res: any = await httpService.post(url, JSON.stringify(data));
        if (res?.isAuthenticate) {
            this._onAuthenticationSuccess(res, onSuccess);
        } else {
            if (typeof onError === 'function') {
                onError(res.servicesRes.errors);
            }
        }
    }


    private _onAuthenticationSuccess(res: any, onSuccess?: (value: any) => void) {
        const userAsString = JSON.stringify(res.servicesRes.payload);
        localStorage.setItem('user', userAsString);
        if (typeof onSuccess === 'function') { onSuccess(res.servicesRes.payload); }
    }
}

export default AuthenticationService.getInstance()