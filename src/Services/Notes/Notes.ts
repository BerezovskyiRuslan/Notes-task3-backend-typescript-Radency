import { JwtPayload } from 'jsonwebtoken';
import { INotesModel } from "../../Types/Models/Notes/Notes";
import { NotesRepository } from "../../Data/Repositories/Notes/Notes";
import { TokenService } from '../Token/Token';
import { CategoryRepository } from '../../Data/Repositories/Category/Category';

class NotesService {
    public async getAllNotes(token: string) {
        const notes = new NotesRepository();

        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;

        return await notes.getAllNotesUser(userId.id);
    }

    public async getItemNote(token:string, id: string) {
        const note = new NotesRepository();
        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;

        return note.getItemNote(userId.id, id);
    }

    public async createNewNote(token: string, data: { name: string, content: string, category: string }) {
        const note = new NotesRepository();
        
        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;
        
        let date = new Date();
        let month = date.toLocaleDateString('en-US', {
            month: 'long'
        })
        let day = date.getDate();
        let year = date.getFullYear();
        let name = data?.name || 'New Note';
        let category = data?.category || 'Task';
        let content = data?.content || '';
        let created = month + ' ' + day + ', ' + year;
        let dates = content.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) || [];
        
        dates = dates != null ? dates : [];
    
        let newNote = {
            name: name,
            created: created,
            category: category,
            content: content,
            dates: dates,
            isArchive: false,
            userId: userId.id
        }

        return note.createItemNote(newNote);
    }

    public async updateItemNote(token:string, id: string, data: { name: string, content: string, category: string, isArchive: boolean }) {
        const note = new NotesRepository();
        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;
        const noteItem: INotesModel | unknown | any = note.getItemNote(userId.id, id);

        let name = data?.name || noteItem.name;
        let category = data?.category || noteItem.category;
        let content = data?.content || noteItem.content as string;
        let dates = content?.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) || [] as string[] | null;
        let archive = data?.isArchive || noteItem.isArchive;

        // dates = dates != null ? dates : []

        return note.updateItemNote(userId.id, id, { ...noteItem, 
            name: name, 
            category: category, 
            content: content, 
            dates: dates, 
            isArchive: archive 
        })
    }

    public async deleteItemNote(token:string, id: string) {
        const note = new NotesRepository();

        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;

        return note.deleteItemNote(userId.id, id);
    }

    public async deleteAllNotes(token: string, isArchive: boolean) {
        const note = new NotesRepository();

        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;

        return note.deleteAllNotes(userId.id, isArchive);
    }

    public async getStats(token: string) {

        const userId = await new TokenService().validateRefreshToken(token) as JwtPayload;
        const notes = await new NotesRepository().getAllNotesUser(userId.id);
        const category = await new CategoryRepository().getAll();

        const stats = () => { 
            let condition = []; 

            for (let i = 0; i < category.length; i++) {
                condition[i] = {
                    name: category[i].name,
                    active: 0,
                    archive: 0
                }

                for (let j = 0; j < notes.length; j++) {
                    if (category[i].name == notes[j].category) {
                        if (notes[j].isArchive) {
                            condition[i].archive += 1;

                            continue;
                        }

                        condition[i].active += 1;
                    }
                }
            }
            
            return condition;
        }

        console.log(stats());

        return await stats();
        
    }
}

export { NotesService }