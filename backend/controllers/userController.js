
//@desc     Register new User
//@route    POST  /apis/users
//@access   public
const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}

//@desc     Authenticate a User
//@route    POST  /apis/users/login
//@access   public
const loginUser = (req, res) => {
    res.json({message: 'Register User'})
}

//@desc    Get user dat
//@route    GET  /apis/users/me
//@access   public
const getMe = (req, res) => {
    res.json({message: 'User data'})
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
}