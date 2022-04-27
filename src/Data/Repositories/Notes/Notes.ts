import { INotesModel } from './../../../Types/Models/Notes/Notes';
import Notes from '../../Models/Notes/Notes'

class NotesRepository {
    public async getAllNotesUser(userId: string): Promise<INotesModel[]> {
        const notes = await Notes.find({ userId: userId });
        
        return notes;
    }

    public async getItemNote(userId:string, id: string) {
        const note = await Notes.findById({ _id: id, userId: userId});

        return note;
    }

    public async createItemNote(data: INotesModel) {
        const createNote = await Notes.create(data);

        return createNote;
    }

    public async updateItemNote(userId: string, id: string, data: INotesModel) {
        const updateNote = await Notes.findByIdAndUpdate(
            { _id: id, userId: userId },
            data,
            { new: true }
        );

        return updateNote;
    }

    public async deleteItemNote(userId: string, id: string) {
        console.log(id)
        const deleteNote = await Notes.remove({ _id: id, userId: userId });

        return deleteNote;
        // return 1
    }

    public async deleteAllNotes(userId:string,isArchive: boolean) {
        const deleteNotes = await Notes.remove({ userId:userId, isArchive: isArchive });

        return deleteNotes.deletedCount;
    }
}

export { NotesRepository }