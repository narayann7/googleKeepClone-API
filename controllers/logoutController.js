import refreshTokens from '../models/refreshToken'
import ErrorHandlerClass from '../services/ErrorHandlerClass'
const refreshKey = "refreshkey"
import User from '../models/Users'
import JwtService from '../services/jwtService'
const logoutController = {

    async logoutUser(req, res, next) {

        try {

            const { _id, email } = JwtService.refreshVerify(req.body.refreshtoken)


            const user = await User.findOne({ _id: _id })

            if (!user)
                return next(ErrorHandlerClass.userNotExist)

            refreshTokens.findOneAndUpdate({ _id: user.refreshTokenId }, {
                $set: {
                    refreshToken: "unauthorised",
                    authenticated: false
                }
            }).then((result) => {
                res.send("logout successful")
            }).catch((err) => {
                return next(err)
            });
        } catch (error) {
            return next(error)
        }
    }
}

export default logoutController