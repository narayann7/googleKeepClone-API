import mongoose from "mongoose";


const notesSchema = new mongoose.Schema({

    uid: { type: String, require: true,},
    title: { type: String, },
    description : { type: String, require: true },
    color:{ type: String,}
},{ timestamps: true })

const notes = mongoose.model('note', notesSchema, 'notes')

export default notes