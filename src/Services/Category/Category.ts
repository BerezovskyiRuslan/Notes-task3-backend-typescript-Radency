import { ICategoryModel } from "../../Types/Models/Category/Category";
import { CategoryRepository } from '../../Data/Repositories/Category/Category'

class CategoryService {
    public getAllCategory(): Promise<ICategoryModel[]> {
        const categories = new CategoryRepository();

        return categories.getAll();
    }
}

export { CategoryService }