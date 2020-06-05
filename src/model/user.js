const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        unique: true,
        required: true,
        unique : true,
        validate(value){
            if(value<0){
                throw new Error("Username cannot be empty")
            }
        }
    },
    Password: {
        type: String,
        required: true,
        validate(value){
            if(value<0){
                throw new Error("Password cannot be empty")
            }
        }
    }
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDRjMTE2NzQ0ZTEwNGZmNGQ5MGE2YiIsImlhdCI6MTU5MTAwMTM2OH0.dO-b9GjdVsKZM308N329LyfhC89erwlLDSUEtbvPZVU

UserSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified()) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.Password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }

            user.Password = hash
            next()
        })

    })

})


UserSchema.methods.comparePassword = function (Password) {
    const user = this

    return new Promise((resolve, reject) => {
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) {
                return reject(false)
            }

            if (!isMatch) {
                return reject(false)
            }

            resolve(true)
        })
    })
}

mongoose.model("User", UserSchema)