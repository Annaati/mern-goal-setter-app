const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/usermodel')

//@descr Get Goals
//@route GET /api/goals

const { Error } = require("mongoose")
const { findById } = require('../models/goalModel')

//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

//@descr Set Goal
//@route POST /api/goals
//@access private
const setGoal =  asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Plz insert Textfield')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//@descr Update Goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for User credentials
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //assure that user can update only their goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not autharized')
    }

    const Updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(Updatedgoal)
})

//@descr Delete Goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal =  asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        req.status(40)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for User credentials
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //assure that user can update only their goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not autharized')
    }

     await goal.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}