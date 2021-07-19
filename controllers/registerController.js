import joi from 'joi'
import ErrorHandlerClass from '../services/ErrorHandlerClass'
import User from '../models/Users'
import bcrypt from 'bcrypt'
import JwtService from '../services/jwtService'
import refreshTokens from '../models/refreshToken'
const refreshKey = "refreshkey"
const registerController = {

    async register(req, res, next) {
        //making schema for userSignUp
        const registerSchema = joi.object({
            username: joi.string().min(3).max(30).required(),
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9{3,30}]')).required(),
            confirm_password: joi.ref('password')
        })
        const { error } = registerSchema.validate(req.body)
        //any error which thrown will be catch by error 
        // handler middelware in express.
        //but error handler middelware in express
        //cant catch the error thrown by acyns functions
        if (error) {
            return next(error)
            //so we pass the error thougth a middleware
            //and we have to create a error handdling middleware
        }

        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                //where errors are app specific  we have throw the error manually
                //so we have to create a custom error handdler class
                return next(ErrorHandlerClass.alreadyExist())

            }
        } catch (error) {
            return next(error)
        }

        //before saving password you must hash it for hashing it using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const { email, username } = req.body

        let accessToken;
        let refreshToken;
        let authenticated = false
        try {

            const user = new User({
                email,
                username,
                password: hashedPassword,
                refreshTokenId: email
            });
            const result = await user.save();
            //token
            accessToken = JwtService.sign({ _id: result._id, email: result.email })
            refreshToken = JwtService.refreshSign({ _id: result._id, email: result.email })
            authenticated = true
            const { _id } = await refreshTokens.create({ refreshToken,authenticated })

            await User.findOneAndUpdate({ _id: result._id }, {

                $set: {
                    refreshTokenId: _id
                }
            })
        } catch (error) {
            return next(error)
        }
        res.json({ accessToken, refreshToken })
    }
}


export default registerController


