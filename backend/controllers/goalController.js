const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

//@descr Get Goals
//@route GET /api/goals

const { Error } = require("mongoose")

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
        text: req.body.text
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

     await goal.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}