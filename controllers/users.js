const mongoose = require('mongoose')

const User = require('../model/user')

const index = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
    return res.status(200).json(users)
}

const show = async (req, res) => {
    const { username } = req.params
    if (!mongoose.Types.ObjectId.isValid(username)) {
        return res.status(404).json({ error: 'No username here' })
    }

    const user = await User.findByName(username)
    if (!user) {
        return res.status(404).json({ error: 'No user here' })
    }
    res.status(200).json(user)
}

const create = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.create({ username, password })
        return res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No id here' })
    }
    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({ error: 'No user here' })
    }
    res.status(200).json(user)
}

const destroy = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No id here' })
    }
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(404).json({ error: 'No id here' })
    }
    res.status(200).json(user)
}

module.exports = { index, create, show, destroy, update }
