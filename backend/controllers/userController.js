const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')


//@desc     Register new User
//@route    POST  /apis/users
//@access   public
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all feilds')
    }

    //check if user already Exists
    const userExists = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error('a User with that Email Already Exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }

    //res.json({message: 'Register User'})
})

//@desc     Authenticate a User
//@route    POST  /apis/users/login
//@access   public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    ///check if the user with that email exists
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    //res.json({message: 'Register User'})
})

//@desc    Get user dat
//@route    GET  /apis/users/me
//@access   public
const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'Get User data'})
})


//JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}