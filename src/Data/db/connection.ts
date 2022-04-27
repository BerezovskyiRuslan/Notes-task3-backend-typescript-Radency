import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/notes;'

const connection = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('DBConnect')
        })
        .catch((e)=> {
            console.log('Error')
        })
}

export { connection }
