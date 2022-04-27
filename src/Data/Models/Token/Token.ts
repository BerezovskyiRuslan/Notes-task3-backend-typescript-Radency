import { Schema, model } from 'mongoose';
import { ModelsName } from '../../../Types/Enum/ModelName';
import { ITokenModel } from '../../../Types/Models/Token/Token';

const tokenModel = new Schema<ITokenModel>({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    refreshToken: String
})

export default model<ITokenModel>(ModelsName.REFRESH_TOKEN, tokenModel);