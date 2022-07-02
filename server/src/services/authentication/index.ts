import { ApiResponse, IUser } from '../../model';
import { userService } from '../';
export class AuthenticationService {

    async authenticate(email: string, password: string): Promise<ApiResponse> {
        //todo convert password to hash
        const user = await userService.findOne(email, password)
        const res = new ApiResponse(user);
        if (!user) {
            res.setErrors(['Something went wrong please try again later.'])
        }
        return res;
    }

    async register(user: IUser): Promise<ApiResponse> {
        const exists = await userService.findOne(user.email, user.password);
        if (exists) {
            return new ApiResponse({});
        }
        //todo convert password to hash
        return new ApiResponse(await userService.createUser(user.name, user.email, user.password, user.avatar || ''))
    }

}