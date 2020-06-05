const express = require("express")
const mongoose = require("mongoose")
const User = mongoose.model("User")
const UserMovie = mongoose.model("UserMovie")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try {
        const u = await User.findOne({ UserName: req.body.UserName })
        if (u) {
            return res.send({ message: "user already exists", error: true })
        }
        user.save().then((u) => {

            const um = new UserMovie({
                u_id: u._id,
                favourites: [],
                watchlater: []
            })
            um.save().then(() => {

                const token = jwt.sign({ id: u._id }, "1999")

                res.send({
                    message: "signed up",
                    error: false,
                    token: token
                })

            }).catch((e) => {
                console.log(e)
                return res.send({ message: "Unknown error encountered", error: true })
            })

        }).catch((e) => {
            console.log(e)
            res.send({ message: "error while signing up", error: true })
        })
    } catch (e) {
        console.log(e)
        res.send({ message: e, error: true })
    }
})

router.post("/signin", async (req, res) => {
    const user = await User.findOne({ UserName: req.body.UserName })
    if (!user) {
        return res.send({ message: "No user with the username found", error: true })
    }

    try {
        user.comparePassword(req.body.Password).then(() => {

            const token = jwt.sign({ id: user._id }, "1999")

            res.send({
                message: "signed inp",
                error: false,
                token: token
            })

        }).catch((e) => {
            res.send({ message: "error while signing in", error: true })
        })
    }
    catch (e) {
        res.send({ message: e, error: true })
    }
})

module.exports = router