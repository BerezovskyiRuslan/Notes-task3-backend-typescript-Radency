import { ICategoryModel } from "../../../Types/Models/Category/Category";
import Category from '../../Models/Category/Category'

class CategoryRepository {
    public async getAll(): Promise<ICategoryModel[]> {
        return await Category.find();
    }
}

export { CategoryRepository }