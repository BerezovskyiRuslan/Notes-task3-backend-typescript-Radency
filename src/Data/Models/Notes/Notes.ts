import { Schema, model } from "mongoose";
import { INotesModel } from "../../../Types/Models/Notes/Notes";
import { ModelsName } from "../../../Types/Enum/ModelName";

const notesModel = new Schema<INotesModel>({
    name: String,
    category: String,
    content: String,
    created: String,
    dates: Array,
    isArchive: Boolean,
    userId: Schema.Types.ObjectId
    // userId: { type: Schema.Types.ObjectId, ref: 'users' }
})

export default model<INotesModel>(ModelsName.NOTES, notesModel);
