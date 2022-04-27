import bcrypt from 'bcrypt';
import { TokenService } from '../Token/Token';
import { UserRepository } from "../../Data/Repositories/User/User";
import { IUserModel } from "../../Types/Models/User/User";

class AuthService {
    public async registration(body: IUserModel) {
        const candidate = await new UserRepository().getUser(body.email);

        if(candidate) {

            throw new Error(`User with ${body.email} in created!`);
        
        }

        const hashPassword = await bcrypt.hash(body.password, 3);

        const user = await new UserRepository().createUser({...body, password: hashPassword});

        const token = await new TokenService().generateToken({ id: user._id?.toString(), email: user.email});

        await new TokenService().saveToken(user._id, token.refreshToken);

        return { ...token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email}}
    }

    public async login(body: {email: string, password: string}) {
        const user = await new UserRepository().getUser(body.email);

        if(!user) {
            throw new Error(`This email ${body.email} not found.`)
        }

        const isPassEquals = await bcrypt.compare(body.password, user.password);

        if (!isPassEquals) {
            throw new Error(`This password not validate!`)
        }

        const token = await new TokenService().generateToken({ id: user._id?.toString(), email: user.email});

        await new TokenService().saveToken(user._id, token.refreshToken);

        return { ...token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }}
    }

    public logout(refreshToken: string) {
        const token = new TokenService().removeRefreshToken(refreshToken);

        return token;
    }

    public async refresh(refreshToken: string) {

        if(!refreshToken) {
            throw new Error("Not Found");
        }
        
        const userData = await new TokenService().validateRefreshToken(refreshToken);
        const tokenFromDB = await new TokenService().findToken(refreshToken);

        if(!userData || !tokenFromDB) {
            throw new Error("Not Found");
        }

        const user = await new UserRepository().getUser(userData.email);
        const token = await new TokenService().generateToken({id: user?._id, email: user?.email});

        await new TokenService().saveToken(user?._id, token.refreshToken);

        return { ...token, user: { id: user?._id, firstName: user?.firstName, lastName: user?.lastName, email: user?.email }}
    }
}

export { AuthService }