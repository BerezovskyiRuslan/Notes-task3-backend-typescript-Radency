import express from 'express';
import { CategoryController } from '../../Controllers/Category/Category'
import { isAuth } from '../../Middleware/Auth/Auth';

const router = express.Router();
const controller = new CategoryController();

router.get('/', isAuth, controller.getAllCategory);

export default router;