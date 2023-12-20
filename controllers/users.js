const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const env = require('dotenv');
env.config()
const User = require('../model/user')

const index = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
    return res.status(200).json(users)
}

const show = async (req, res) => {
    const { username } = req.params
    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(404).json({ error: 'No user here' })
    }

    res.status(200).json(user)
}

async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) { 
            throw new Error('No user with this username') 
        }
        const authed = await bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { username: user.username }
            const sendToken = (err, token) => {
                if(err){ 
                    throw new Error('Error in token generation') 
                }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err: { message: err.message } });
    }
}

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        const username = req.body.username
        const password = hashed
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

const updateScore = async (req, res) => {
    const user = await User.findOneAndUpdate({ username: req.body.username }, {
        $inc: {score: req.body.score}
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

module.exports = { index, login, register, show, destroy, updateScore, update }
