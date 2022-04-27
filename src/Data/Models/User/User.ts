import { Schema, model } from 'mongoose';
import { ModelsName } from '../../../Types/Enum/ModelName';
import { IUserModel } from '../../../Types/Models/User/User';

const userModel = new Schema<IUserModel>({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

export default model<IUserModel>(ModelsName.USER, userModel);