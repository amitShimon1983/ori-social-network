import jwt from 'jsonwebtoken';
import { appConfig } from '../../config';
class EncryptionProvider {
    _secret: string;
    constructor() {
        this._secret = appConfig.secret || 'secret'
    }
    private static instance: EncryptionProvider;

    static getInstance() {
        if (!EncryptionProvider.instance) {
            EncryptionProvider.instance = new EncryptionProvider()
        }
        return EncryptionProvider.instance;
    }

    sign(input: string, tokenExpiration: number) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + tokenExpiration,
            data: input
        }, this._secret);
    }
    getCookieData(input: string) {
        if (!input) {
            throw new Error('no valid cookie')
        }
        const res = this.verify(input);
        if (res?.data) {
            console.log(res?.data);

            try {
                const user = JSON.parse(res?.data);
                return user;
            }
            catch (error) {
                console.log(error);
            }

        }
    }
    verify(input: string) {
        let token: any = '';
        try {
            token = jwt.verify(input, this._secret);
        }
        catch (error: any) {
            const data = jwt.decode(input) as any
            return { error: 'UNAUTHENTICATED', ...data };
        }
        return token
    }
}

export default EncryptionProvider.getInstance()