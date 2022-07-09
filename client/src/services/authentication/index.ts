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

    async logout(onSuccess?: (value?: any) => void, onError?: (error?: any) => void) {
        const url = `${appConfig.serverUrl}${appConfig.logoutEndpoint}`
        const res: any = await httpService.post(url);
        localStorage.setItem('user', '');
        if (typeof onSuccess === 'function') { onSuccess(res) }
    }

    async refresh() {
        const url = `${appConfig.serverUrl}/api/refresh`
        await httpService.get(url);
    }

    async login(data: { [key: string]: any }, onSuccess: (value: any) => void) {
        const url = `${appConfig.serverUrl}${appConfig.loginEndpoint}`
        const res: any = await httpService.post(url, JSON.stringify(data));
        if (res.isAuthenticate) {
            const userAsString = JSON.stringify(res.servicesRes.payload);
            localStorage.setItem('user', userAsString);
            onSuccess(res.servicesRes.payload);
        }
    }

}

export default AuthenticationService.getInstance()