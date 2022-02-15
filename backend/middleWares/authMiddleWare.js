const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get the Toke from the header and split from the Bearer
            token = req.headers.authorization.split(' ')[1]

            //Verify The Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get The Uers
            req.user = await User.findById(decoded.id).select(-password)

            next()
        } catch (err){
            console.log(err)
            res.status(401)
            throw new Error('Not autharized')
        }
    }
    if(!token){
            res.status(401)
            throw new Error('No token, Not autharized')
    }
})

module.exports = { protect }