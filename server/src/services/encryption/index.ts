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

    verify(input: string) {
        let token: any = '';
        try {
            token = jwt.verify(input, this._secret);
        }
        catch (error: any) {
            return 'UNAUTHENTICATED';
        }
        return token
    }
}

export default EncryptionProvider.getInstance()