import User from "../models/Users";
import ErrorHandlerClass from "../services/ErrorHandlerClass";

const whoAmIcontroller = {

    async whoAmI(req, res, next) {
  

        try {
         
            const result = await User.findOne({ _id:req.User._id })

            if (!result)
                return next(ErrorHandlerClass.userNotExist)


            res.json({ _id: result._id, email: result.email, username: result.username })

        } catch (error) {
            return next(error)
        }
    }
}

export default whoAmIcontroller

