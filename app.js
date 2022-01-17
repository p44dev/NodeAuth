const mongoose = require("mongoose")
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(() => {
    console.log("DB connected successfully!")
}).catch(() => {
    console.log("DB connect error!")
})

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Import the routes for the later use
const userRoutes = require("./routes/user")

// Using the routes
app.use("/api", userRoutes)

// Setting the application port
const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
    console.log(`App is started running at ${port}`)
})
