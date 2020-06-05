const express = require("express")
const mongoose = require("mongoose")
const auth = require("../middleware/auth")
const UserMovie = mongoose.model("UserMovie")
const User = mongoose.model("User")
const router = express.Router()

router.use(auth)

router.get("/movies", (req, res) => {
    const response = []
    UserMovie.findOne({ u_id: new mongoose.Types.ObjectId(req.user._id) }).then((m) => {

        res.send({
            favourites: m.favourites,
            watchlater: m.watchlater,
            error: false
        })

    }).catch((e) => {
        res.send({
            message: "Unknown error encountered",
            error: true
        })
    })
})

router.post("/favourites", (req, res) => {
    UserMovie.findOne({ u_id: new mongoose.Types.ObjectId(req.user._id) }).then((m) => {
        m.favourites.splice(0, 0, req.body.favourites)
        m.save().then(() => {
            res.send({
                message: "added successfully",
                error: false
            })
        }).catch((e) => {
            res.send({
                message: "Not Added",
                error: true
            })
        })
    }).catch((e) => {
        res.send({
            message: "Not Added",
            error: true
        })
    })
})

router.post("/watchlater", (req, res) => {
    UserMovie.findOne({ u_id: new mongoose.Types.ObjectId(req.user._id) }).then((m) => {
        m.watchlater.splice(0, 0, req.body.watchlater)
        m.save().then(() => {
            res.send({
                message: "added successfully",
                error: false
            })
        }).catch((e) => {
            res.send({
                message: "Not Added",
                error: true
            })
        })
    }).catch((e) => {
        res.send({
            message: "Not Added",
            error: true
        })
    })
})

router.post("/RemoveWatchlater", (req, res) => {
    UserMovie.findOne({ u_id: new mongoose.Types.ObjectId(req.user._id) }).then((m) => {
        let updatedm = m.watchlater.filter((movie) => {
            return req.body.m_id != movie.m_id
        })
        m.watchlater = updatedm
        m.save().then(() => {
            res.send({
                message: "removed successfully",
                error: false
            })
        }).catch((e) => {
            res.send({
                message: "Not Removed",
                error: true
            })
        })
    }).catch((e) => {
        res.send({
            message: "Not Removed",
            error: true
        })
    })
})

router.post("/RemoveFavourite", (req, res) => {
    UserMovie.findOne({ u_id: new mongoose.Types.ObjectId(req.user._id) }).then((m) => {
        let updatedm = m.favourites.filter((movie) => {
            return req.body.m_id != movie.m_id
        })
        m.favourites = updatedm
        m.save().then(() => {
            res.send({
                message: "removed successfully",
                error: false
            })
        }).catch((e) => {
            res.send({
                message: "Not Removed",
                error: true
            })
        })
    }).catch((e) => {
        res.send({
            message: "Not Removed",
            error: true
        })
    })
})


module.exports = router