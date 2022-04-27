import express from 'express';
import { errorHandler } from '../../Helper/ErrorHandler';
import { NotesService } from '../../Services/Notes/Notes';
import { HttpCode } from '../../Types/Enum/HttpCode';

class NotesController {
    public async getAllNotes(req: express.Request, res: express.Response) {
        try {

            const notes = await new NotesService().getAllNotes(req.cookies.refreshToken);

            res.status(HttpCode.OK).json(notes);

        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async getItemNotes(req: express.Request, res: express.Response) {
        try {
            const note = await new NotesService().getItemNote(req.cookies.refreshToken , req.params.id);

            res.status(HttpCode.OK).json(note);
            
        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async createItemNote(req: express.Request, res: express.Response) {
        try {

            const newNote = await new NotesService().createNewNote(req.cookies.refreshToken, req.body);

            res.status(HttpCode.CREATED).json(newNote)

        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async updateItemNote(req: express.Request, res: express.Response) {
        try {

            const updateNote = await new NotesService().updateItemNote(req.cookies.refreshToken, req.params.id, req.body);

            res.status(HttpCode.OK).json(updateNote);

        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async deleteItemNote(req: express.Request, res: express.Response) {
        try {
            const deleteItem = await new NotesService().deleteItemNote(req.cookies.refreshToken, req.params.id);

            console.log(req.params.id)

            res.status(HttpCode.OK).json(deleteItem);
        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async deleteAllNote(req: express.Request, res: express.Response) {
        try {
            const deleteAll = await new NotesService().deleteAllNotes(req.cookies.refreshToken, req.body.isArchive);

            res.status(HttpCode.OK).json(deleteAll);
        } catch(e) {
            errorHandler(res, e);
        }
    }

    public async getStats(req: express.Request, res: express.Response) {
        try {

            const stats = await new NotesService().getStats(req.cookies.refreshToken);

            res.status(HttpCode.OK).json(stats);
            
        } catch (e) {
            errorHandler(res, e);
        }
    }
}

export { NotesController }