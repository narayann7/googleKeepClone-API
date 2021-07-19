import notes from "../models/notes"
import joi from 'joi'
import JwtService from "../services/jwtService"
import ErrorHandlerClass from "../services/ErrorHandlerClass";

const createNoteController = {

    async createNote(req, res, next) {

        try {
            let authHeader = req.headers.authorization

            const accessToken = authHeader.split(' ')[1]
            const { _id, email } = JwtService.verify(accessToken)

            let title = req.body.title
            let description = req.body.description
            let color = req.body.color

            const note = new notes({
                uid: _id,
                title,
                description,
                color
            })
            await note.save()
            res.send(note)
        } catch (error) {
            return next(error)
        }

    }


}

export default createNoteController