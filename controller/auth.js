require("dotenv").config();
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const token = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.sendStatus(400)

    const ValidPassword = await bcrypt.compare(password, user.password)
    if (!ValidPassword) return res.sendStatus(400)

    const user_details = {
        id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        is_superuser: user.isSuperuser
    }
    const access = jwt.sign(user_details, process.env.TOKEN_SECRET, { expiresIn: '15m' })
    const refresh = jwt.sign(user_details, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })


    User.updateOne({ email: user.email },
        {
            refresh: refresh
        }, (err, docs) => {
            if (err) return res.sendStatus(403)
            else return res.status(200).json({ access, refresh })
        })
}

const token_refresh = async (req, res) => {
    const refresh = req.body.refresh
    if (refresh == null) return res.sendStatus(401)

    try {
        const verified = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET)
        const user_details = {
            id: verified.id,
            username: verified.username,
            email: verified.email,
            phone_number: verified.phone_number,
            is_superuser: verified.is_superuser,
        }
        const user = await User.findOne({ email: user_details.email })
        if (user.refresh === refresh) {
            const new_token = jwt.sign(user_details, process.env.TOKEN_SECRET, { expiresIn: '15m' })
            const new_refresh = jwt.sign(user_details, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

            User.updateOne({ email: user_details.email },
                {
                    refresh: new_refresh
                }, (err, docs) => {
                    if (err) return res.sendStatus(403)
                    else return res.status(200).json({ access: new_token, refresh: new_refresh })
                })
        }
        else return res.sendStatus(403)
    } catch (err) {
        return res.sendStatus(403)
    }
}

const signup = async (req, res) => {
    const { username, email, phone_number } = req.body
    const password = await bcrypt.hash(req.body.password, 10)

    const handleValidationError = (err) => {
        let message;
        const key = Object.keys(err.errors);
        if (err.errors[key[0]] && err.errors[key[0]].properties) {
            message = err.errors[key[0]].properties.message;
        }
        return message;
    }

    const handleDuplicateField = (err) => {
        let message;
        const keys = Object.keys(err.keyValue);
        if (keys.includes('email')) message = 'User already exists';
        return message;
    }

    try {
        const newUser = new User({
            username,
            email,
            phone_number,
            password
        })

        await newUser.save()
        return res.status(201).json({ message: "user created successfly" })

    } catch (err) {
        let message = 'something went wrong';
        if (err.name === 'ValidationError') message = handleValidationError(err);
        if (err.code === 11000) message = handleDuplicateField(err);
        return res.status(400).json({ message });
    }
}

module.exports = {
    token,
    token_refresh,
    signup
}