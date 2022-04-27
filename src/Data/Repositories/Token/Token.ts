import Token from '../../Models/Token/Token';
import { ITokenData, ITokenModel } from '../../../Types/Models/Token/Token';

class TokenRepository {
    public async saveRefreshToken(data: ITokenData): Promise<ITokenModel> {
        const tokenRefresh = await Token.create(data);

        return tokenRefresh;
    }

    public async updateRefreshToken(data: ITokenModel): Promise<ITokenModel | null>  {
        const tokenRefresh = await Token.findByIdAndUpdate(
            {_id: data._id},
            data,
            {new: true}
        );

        return tokenRefresh;
    }

    public async deleteRefreshToken(refreshToken: string) {
        const tokenRefresh = Token.remove({refreshToken: refreshToken});

        return tokenRefresh;
    }

    public async findRefreshTokenByUserId(userId: string | undefined): Promise<ITokenModel | null> {
        const tokenRefresh = await Token.findOne({userId: userId});

        return tokenRefresh;
    }

    public async findRefreshTokenByToken(token: string): Promise<ITokenModel | null> {
        const tokenRefresh = await Token.findOne({refreshToken: token});

        return tokenRefresh;
    }
}

export { TokenRepository }