import { Response } from "express";

class CookieProvider {
    private static instance: CookieProvider;
    static getInstance() {
        if (!CookieProvider.instance) {
            CookieProvider.instance = new CookieProvider();
        }
        return CookieProvider.instance;
    }

    setCookie(res: Response, data: any, cookieName: string) {
        res.cookie(cookieName, data, {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
    }

    removeCookie(res: Response, cookieName: string) {
        res.cookie(cookieName, '', {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
    }
}

export default CookieProvider.getInstance()