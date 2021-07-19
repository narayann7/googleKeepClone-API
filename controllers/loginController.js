import joi from 'joi'
import ErrorHandlerClass from '../services/ErrorHandlerClass'
import User from '../models/Users'
import bcrypt from 'bcrypt'
import JwtService from '../services/jwtService'
const refreshKey = "refreshkey"
import refreshTokens from '../models/refreshToken'

const loginController = {

    async loginUser(req, res, next) {


        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9{3,30}]')).required(),
        })

        const { error } = loginSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        let accessToken
        let refreshToken
        try {
            const result = await User.findOne({ email: req.body.email })
            if (!result) {
                return next(ErrorHandlerClass.notExist())
            }

            const check = await bcrypt.compare(req.body.password, result.password)

            if (!check)
                return next(ErrorHandlerClass.passwordNotMatched())


            accessToken = JwtService.sign({ _id: result._id, email: result.email })
            refreshToken = JwtService.refreshSign({ _id: result._id, email: result.email })

           await refreshTokens.findOneAndUpdate({ _id: result.refreshTokenId },{
                $set: {
                    refreshToken:refreshToken,
                    authenticated: true
                }
            })

        } catch (error) {
            return next(error)
        }
        res.json({ accessToken, refreshToken })
    }
}

export default loginController