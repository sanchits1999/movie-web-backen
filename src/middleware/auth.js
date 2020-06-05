const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = mongoose.model("User")

const authmiddle = (req,res,next) => {
    const auth = req.headers.authorization


    if(!auth){
        return res.send({
            message : "you must be logged in",
            error : true})
    }

    const token = auth.replace("Bearer ","")

    jwt.verify(token,"1999",(err , payload)=>{
        if(err){
            return res.send({
                message : "you must be logged in",
                error : true
            })
        }

        User.findById(payload.id).then((u)=>{
            req.user = u
            next()
        }).catch((e) => {
            return res.send({
                message : "User not found",
                error : true
            })
        })
    })

}

module.exports = authmiddle