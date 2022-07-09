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
        //todo convert password to hash
        //generate token
        const user = await userService.findOneIfExists(email)
        const servicesRes = new ApiResponse();
        let token: string = '';
        let isAuthenticate: boolean = false;
        if (!user || !await hashService.compare(password, user.password)) {
            servicesRes.setErrors(['Something went wrong please try again later.'])
        } else {
            const payload = { name: user.name, email: user.email, avatar: user.avatar, _id: user._id }
            token = jwtService.sign(JSON.stringify(payload), 3600);
            isAuthenticate = true;
            servicesRes.setPayload(payload)
        }
        return { servicesRes, token, isAuthenticate };
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