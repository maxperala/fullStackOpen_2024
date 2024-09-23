const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require("./utils/middleware")
const mongoose = require('mongoose')
const blogRouter = require("./routers/blogRouter")



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(blogRouter)
app.use(middleware.errorHandler)





module.exports = app;