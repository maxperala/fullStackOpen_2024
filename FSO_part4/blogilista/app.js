const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require("./utils/middleware")
const mongoose = require('mongoose')
const blogRouter = require("./routers/blogRouter")
const userRouter = require("./routers/userRouter")
const loginRouter = require("./routers/loginRouter")



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", middleware.tokenExtract, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)





module.exports = app;