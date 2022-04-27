import express from 'express';
import { AuthController } from '../../Controllers/Auth/Auth';

const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout);
router.get('/refresh', controller.refresh);

export default router;