import { AuthenticationError } from "apollo-server-core";
import { Response } from "express";
import { authenticationService, cookieService, jwtService } from "../../services";

export async function authenticateRequestMiddleware(token: string, res?: Response) {
    if (!token) {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    const { data, error } = jwtService.verify(token);
    if (error === 'UNAUTHENTICATED') {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    if (error === 'refresh_token') {
        const { isAuthenticate, token: resToken } = await authenticationService.refresh(token);
        if (isAuthenticate && res) {
            cookieService.setCookie(res, resToken, 'user');
        } else {
            throw new AuthenticationError('UNAUTHENTICATED');
        }
    }
    const user = JSON.parse(data);
    return user
}