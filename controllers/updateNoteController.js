
import notes from "../models/notes"
import ErrorHandlerClass from "../services/ErrorHandlerClass";

const updateNoteController = {
    async updateNote(req, res, next) {

        try {
            const result = await notes.findOne({ _id: req.body._id })

            if (!result)
                return next(ErrorHandlerClass.noNoteFound)

            const finalResult = await notes.findByIdAndUpdate({ _id: result._id }, {

                $set: {

                    title: req.body.title,
                    description: req.body.description,
                    color: req.body.color
                }
            })
            res.send(finalResult)
        } catch (error) {
            return next(error)
        }
    }
}
export default updateNoteController