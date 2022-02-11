//@descr Get Goals
//@route GET /api/goals
//@access private
const getGoals = (req, res) => {
    res.status(200).json({message:'Set Goal'})
}

//@descr Set Goal
//@route POST /api/goals
//@access private
const setGoal = (req, res) => {
    res.status(200).json({message:'Set Goal'})
}

//@descr Update Goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = (req, res) => {
    res.status(200).json({message:`Update Goal ${req.params.id}`})
}

//@descr Delete Goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = (req, res) => {
    res.status(200).json({message:`Delete Goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}