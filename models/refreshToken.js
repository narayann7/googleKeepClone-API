import Mongoose from "mongoose";

const Schema = Mongoose.Schema

const refreshTokenSchema = new Schema({
    authenticated: { type: Boolean, require: true, },
    refreshToken: { type: String, require: true, unique: true },
},)

const refreshTokens = Mongoose.model('refreshToken', refreshTokenSchema, 'refreshTokens')

export default refreshTokens 