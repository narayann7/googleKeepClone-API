import jwt from "jsonwebtoken"

class JwtService {
    static sign(payload, expiry = '1y', secret = 'default') {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }
    static refreshSign(payload, expiry = '1y', secret = 'refreshkey') {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }
    static verify(token ,secret = 'default') {
        return jwt.verify(token, secret)
    }
    static refreshVerify(token ,secret = 'refreshkey') {
        return jwt.verify(token, secret)
    }
}

export default JwtService
