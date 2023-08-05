const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const cookieParser = require('cookie-parser')
const passport = require('passport')

require('./middleware/passport-middleware')

const { getUsers, register, login, protected, logout } = require("./controllers/auth")
const { registerValidation, loginValidation } = require("./auth/auth")
const { validationMiddleware } = require("./middleware/validation-middleware")
const { CLIENT_URL } = require("./constants")
const { userAuth } = require("./middleware/auth-middleware")

app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.post('/register', registerValidation, validationMiddleware, register)

app.post("/login", loginValidation, validationMiddleware, login)

app.get('/protected', userAuth, protected)

app.get('/logout', userAuth, logout)

app.listen(5001, () => {
    console.log("Server has started on port 5001")
})

