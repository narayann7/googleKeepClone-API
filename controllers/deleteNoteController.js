import notes from "../models/notes"
const deleteNoteController = {

    async deleteNote(req, res, next) {


        try {

            const result = await notes.findOne({ _id: req.body._id })
            if (!result)
                return next(ErrorHandlerClass.noNoteFound)

            const finalResult = await notes.findByIdAndDelete({ _id: result._id })

            res.send(finalResult)

        } catch (error) {
            return next(error)
        }
    }
}

export default deleteNoteController