import { Schema } from 'mongoose';
export interface INotesModel {
    _id?: number | undefined,
    name: string,
    category: string,
    content: string,
    dates: string[],
    created: string,
    isArchive: boolean,
    userId: typeof Schema.Types.ObjectId | string
    // userId: { type: typeof Schema.Types.ObjectId, ref: string}
}