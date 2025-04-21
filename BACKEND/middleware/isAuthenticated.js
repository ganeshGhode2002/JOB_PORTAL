import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "user is not authenticated",
                succes: false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRETE_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "invalid token",
                succes: false
            })
        }

        req.id = decode.userId;
        // console.log("auth userId: ",req.id)
        next();

    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;