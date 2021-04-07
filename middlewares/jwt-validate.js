const {response} = require  
const jwt = require('jsonwebtoken');

const validateJWT = (req,res = response,next) => {

        // x-token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'There is no token on the request'
        })
    }
    
    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg: 'invalid token'
        })
    }
    next();
}

module.exports = {
    validateJWT
}