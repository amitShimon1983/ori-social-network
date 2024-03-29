import { ApiResponse, IUser } from "../../model";
import { userService, hashService, jwtService } from "../";
import { IFile } from "../../model/schema/file/types";

export class AuthenticationService {
  private static instance: AuthenticationService;

  static getInstance() {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<{
    servicesRes: ApiResponse<IUser>;
    token?: string;
    isAuthenticate: boolean;
  }> {
    const user = await userService.findOneIfExists(email);
    const servicesRes = new ApiResponse<IUser>();
    let token = "";
    let isAuthenticate = false;
    if (!user || !user.password || !(await hashService.compare(password, user.password))) {
      servicesRes.setErrors(["Something went wrong please try again later."]);
    } else {
      const { payload, newToken } = this._onAuthenticateSuccess(user);
      token = newToken;
      isAuthenticate = true;
      servicesRes.setPayload(payload);
    }
    return { servicesRes, token, isAuthenticate };
  }
  _onAuthenticateSuccess(user: IUser): { payload: IUser; newToken: string } {
    const payload = {
      name: user.name,
      email: user.email,
      file: user.file,
      _id: user._id,
      followers: user.followers,
      following: user.following,
      dateOfBirth: user.dateOfBirth,
      lastSeen: new Date(),
    };
    const newToken = jwtService.sign(JSON.stringify(payload), 3600);
    return { payload, newToken };
  }
  async refresh(
    oldToken: string
  ): Promise<{
    servicesRes: ApiResponse<IUser>;
    token?: string;
    isAuthenticate: boolean;
  }> {
    const user = jwtService.getCookieData(oldToken);
    const servicesRes = new ApiResponse<IUser>();
    let isAuthenticate = false;
    let token = "";
    if (user) {
      const { payload, newToken } = this._onAuthenticateSuccess(user);
      isAuthenticate = true;
      token = newToken;
      servicesRes.setPayload(payload);
    }
    return { servicesRes, isAuthenticate, token };
  }
  async register(user: IUser, file: IFile): Promise<ApiResponse<IUser>> {
    const res = new ApiResponse<IUser>();
    const exists = await userService.findOneIfExists(user.email);
    if (!user.password || exists) {
      res.setErrors(["Something went wrong please try again later."]);
    } else {
      const newUser = await userService.createUser(
        user.name,
        user.email,
        await hashService.hash(user.password),
        file._id || "",
        user.dateOfBirth
      );
      const payload: IUser = {
        name: newUser.name,
        email: newUser.email,
        file: newUser.file,
        _id: newUser._id,
        dateOfBirth: newUser.dateOfBirth,
        lastSeen: new Date(),
      };
      res.setPayload(payload);
    }
    return res;
  }
}

export default AuthenticationService.getInstance();
