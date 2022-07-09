import { ApiResponse, IUser } from '../../model';
import { userService, hashService, jwtService } from '../';
import { stringify } from 'querystring';

export class AuthenticationService {
    private static instance: AuthenticationService;

    static getInstance() {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService()
        }
        return AuthenticationService.instance;
    }

    async authenticate(email: string, password: string): Promise<{ servicesRes: ApiResponse; token?: string; isAuthenticate: boolean }> {
        const user = await userService.findOneIfExists(email)
        const servicesRes = new ApiResponse();
        let token: string = '';
        let isAuthenticate: boolean = false;
        if (!user || !await hashService.compare(password, user.password)) {
            servicesRes.setErrors(['Something went wrong please try again later.'])
        } else {
            const { payload, newToken } = this._onAuthenticateSuccess(user);
            token = newToken;
            isAuthenticate = true;
            servicesRes.setPayload(payload)
        }
        return { servicesRes, token, isAuthenticate };
    }
    _onAuthenticateSuccess(user: IUser): { payload: any; newToken: string; } {
        const payload = { name: user.name, email: user.email, avatar: user.avatar, _id: user._id }
        const newToken = jwtService.sign(JSON.stringify(payload), 3600);
        return { payload, newToken }
    }
    async refresh(oldToken: string): Promise<{ servicesRes: ApiResponse; token?: string; isAuthenticate: boolean }> {
        const res = jwtService.verify(oldToken);
        const servicesRes = new ApiResponse();
        let isAuthenticate: boolean = false;
        let token = '';
        if (res?.data) {
            const user = JSON.parse(res?.data);
            const { payload, newToken } = this._onAuthenticateSuccess(user);
            isAuthenticate = true;
            token = newToken;
            servicesRes.setPayload(payload)
        }
        return { servicesRes, isAuthenticate, token }
    }
    async register(user: IUser): Promise<ApiResponse> {
        let res = new ApiResponse();
        const exists = await userService.findOneIfExists(user.email);
        if (exists) {
            res.setErrors(['Something went wrong please try again later.'])
        } else {
            const newUser = await userService.createUser(user.name, user.email, await hashService.hash(user.password), user.avatar || '');
            const payload = { name: newUser.name, email: newUser.email, avatar: newUser.avatar, _id: newUser._id }
            res.setPayload(payload)
        }
        return res;
    }
}

export default AuthenticationService.getInstance();