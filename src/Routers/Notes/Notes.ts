import express from 'express';
import { NotesController } from '../../Controllers/Notes/Notes';
import { isAuth } from '../../Middleware/Auth/Auth';

const router = express.Router();
const controller = new NotesController();

router.get('/',isAuth, controller.getAllNotes);
router.get('/stats', isAuth, controller.getStats);
router.get('/:id', isAuth, controller.getItemNotes);

router.post('/', isAuth, controller.createItemNote);

router.patch('/:id', isAuth, controller.updateItemNote);

router.delete('/all', isAuth, controller.deleteAllNote);
router.delete('/:id', isAuth, controller.deleteItemNote);

export default router;