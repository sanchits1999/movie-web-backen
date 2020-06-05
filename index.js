require("./src/db/mongoose")
require("./src/model/user")
require("./src/model/user-movie")
const express = require("express")
const auth_route = require("./src/routes/authRoutes")
const movie_route = require("././src/routes/movieRoutes")
const cors = require("cors")
const app = express()

var port = process.env.PORT || 3000

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors())
app.use(express.json())
app.use(auth_route)
app.use(movie_route)


app.listen(port, () => {
    console.log("listening on port "+port)
})
