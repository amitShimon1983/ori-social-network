import { ApiResponse, IUser } from '../../model';
import { userService, hashService } from '../';

export class AuthenticationService {
    private static instance: AuthenticationService;

    static getInstance() {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService()
        }
        return AuthenticationService.instance;
    }

    async authenticate(email: string, password: string): Promise<ApiResponse> {
        //todo convert password to hash
        const user = await userService.findOneIfExists(email)
        const res = new ApiResponse();
        if (!user || !await hashService.compare(user.password, password)) {
            res.setErrors(['Something went wrong please try again later.'])
        } else {
            const payload = { name: user.name, email: user.email, avatar: user.avatar, _id: user._id }
            res.setPayload(payload)
        }
        return res;
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