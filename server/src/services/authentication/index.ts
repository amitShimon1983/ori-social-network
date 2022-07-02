import { ApiResponse, IUser } from '../../model';
import { userService } from '../';
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
        const user = await userService.findOne(email, password)
        const res = new ApiResponse();
        if (!user) {
            res.setErrors(['Something went wrong please try again later.'])
        } else {
            res.setPayload(user)
        }
        return res;
    }

    async register(user: IUser): Promise<ApiResponse> {
        let res = new ApiResponse();
        const exists = await userService.findOneIfExists(user.email);
        if (exists) {
            res.setErrors(['Something went wrong please try again later.'])
        } else {
            res.setPayload(await userService.createUser(user.name, user.email, user.password, user.avatar || ''))
        }
        return res;
    }
}

export default AuthenticationService.getInstance();