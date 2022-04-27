import User from '../../Models/User/User';
import { IUserModel } from '../../../Types/Models/User/User';

class UserRepository {
    public async createUser(data: IUserModel): Promise<IUserModel> {
        const user = await User.create(data);

        return user;
    }

    public async getUser(email: string) {
        const user = await User.findOne({email: email});

        return user
    }
}

export { UserRepository }