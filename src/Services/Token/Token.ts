import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenRepository } from '../../Data/Repositories/Token/Token';
import dotenv from 'dotenv';

dotenv.config();

const {
    JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN
} = process.env

class TokenService {
    public generateToken(payload: { id?: string, email?: string}) {
        const accessToken = jwt.sign(payload, <string>JWT_ACCESS_TOKEN, { expiresIn: '20m'});
        const refreshToken = jwt.sign(payload, <string>JWT_REFRESH_TOKEN, { expiresIn: '30d' })
    
        return {
            accessToken,
            refreshToken
        }
    }

    public validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, 'notesAccess');
            return userData;
        } catch  (e) {
            return null;
        }
    }

    public validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, 'notesRefresh') as JwtPayload;
            return userData;
        } catch  (e) {
            return null;
        }
    }

    public async saveToken(userId: string | undefined, refreshToken: string) {
        let tokenData = await new TokenRepository().findRefreshTokenByUserId(userId);

        if(tokenData) {
            const id = tokenData._id;
            tokenData.refreshToken = refreshToken;
            
            return await new TokenRepository().updateRefreshToken(tokenData);
        }

        return await new TokenRepository().saveRefreshToken({userId: userId, refreshToken: refreshToken})
    }

    public removeRefreshToken(refresh_token: string) {
        return new TokenRepository().deleteRefreshToken(refresh_token)
    }

    public findToken(refreshToken: string) {
        return new TokenRepository().findRefreshTokenByToken(refreshToken);
    }
}

export { TokenService }