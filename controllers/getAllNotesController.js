import notes from "../models/notes"
import joi from 'joi'
import JwtService from "../services/jwtService"
import ErrorHandlerClass from "../services/ErrorHandlerClass";

const getAllNotesController={


   async getAllNotes(req,res,next){

        let authHeader = req.headers.authorization

        const accessToken = authHeader.split(' ')[1]
        const { _id, email } = JwtService.verify(accessToken)

        const allNotes=await notes.find({uid:_id})


        if(!allNotes)
        return next(ErrorHandlerClass.noNotes)

        
        res.send(allNotes)


    }

}

export default getAllNotesController