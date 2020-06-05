const mongoose = require("mongoose")

const UserMovieSchema = new mongoose.Schema({
    u_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    favourites: [
        {
            m_id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            release_date: {
                type: String,
                required: true
            },
            poster_path: {
                type: String,
                required: true
            }
        }
    ],
    watchlater: [
        {
            m_id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            release_date: {
                type: String,
                required: true
            },
            poster_path: {
                type: String,
                required: true
            }
        }
    ]
})

mongoose.model("UserMovie", UserMovieSchema)