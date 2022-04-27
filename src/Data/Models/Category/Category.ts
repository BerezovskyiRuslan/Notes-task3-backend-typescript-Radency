import { Schema, model } from 'mongoose';
import { ModelsName } from '../../../Types/Enum/ModelName';
import { ICategoryModel } from '../../../Types/Models/Category/Category';
const categoryModel = new Schema<ICategoryModel>({
    name: String
})

export default model<ICategoryModel>(ModelsName.CATEGORY, categoryModel)