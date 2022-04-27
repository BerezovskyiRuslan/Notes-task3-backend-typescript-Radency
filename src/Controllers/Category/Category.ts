import express from 'express';
import { errorHandler } from '../../Helper/ErrorHandler'
import { HttpCode } from '../../Types/Enum/HttpCode';
import { CategoryService } from '../../Services/Category/Category';

class CategoryController {
    public async getAllCategory(req: express.Request, res: express.Response) {
        try {
    
            let categories = await new CategoryService().getAllCategory();
    
            res.status(HttpCode.OK).json(categories);
    
        } catch (e: any) {
            errorHandler(res, e);
        }
    }
}

export { CategoryController }