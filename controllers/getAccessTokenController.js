import joi from 'joi'
import refreshTokens from '../models/refreshToken'
import ErrorHandlerClass from '../services/ErrorHandlerClass'
import JwtService from '../services/jwtService'
import bcrypt from 'bcrypt'
const refreshKey = "refreshkey"
const getAccessTokenController = {

   async getAccessToken(req, res, next) {

        const registerSchema = joi.object({
            refreshtoken: joi.string().min(3).required(),
        })

        const { error } = registerSchema.validate(req.body)

        if (error)
            return next(error)
        let accessToken
        let result
        let refreshToken=req.body.refreshtoken 
        try {


            const { _id, email } = JwtService.refreshVerify(req.body.refreshtoken)
            accessToken = JwtService.sign({ _id: _id, email: email })


        } catch (error) {
            return next(error)
        }
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
}
export default getAccessTokenController