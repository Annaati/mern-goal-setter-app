const asyncHandler = require('express-async-handler') 

//@descr Get Goals
//@route GET /api/goals

const { Error } = require("mongoose")

//@access private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message:'Set Goal'})
})

//@descr Set Goal
//@route POST /api/goals
//@access private
const setGoal =  asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Plz insert Textfield')
    }

    res.status(200).json({message:'Set Goal'})
})

//@descr Update Goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message:`Update Goal ${req.params.id}`})
})

//@descr Delete Goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal =  asyncHandler(async (req, res) => {
    res.status(200).json({message:`Delete Goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}