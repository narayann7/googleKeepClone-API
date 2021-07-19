import JwtService from "../services/jwtService"
import ErrorHandlerClass from "../services/ErrorHandlerClass";
import User from '../models/Users'


const auth = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (!authHeader)
        return next(ErrorHandlerClass.invaildAccessToken)

    try {
        const accessToken = authHeader.split(' ')[1]
        const { _id, email } = JwtService.verify(accessToken)


        // const result = await
        
        
        User.findOne({ _id:_id }).then((result) => {
              if (!result) {
            return next(ErrorHandlerClass.notExist())
        }
        }).catch((err) => {
            return next(err)
        });
      


        const user = {
            _id,
            email
        }

        req.User = user

        next()
    } catch (error) {
        next(error)
    }
}
export default auth