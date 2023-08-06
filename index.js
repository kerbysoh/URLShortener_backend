const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')
const passport = require('passport')

require('./middleware/passport-middleware')

const { register, login, logout, protected } = require("./controllers/auth")
const { getLinks, addLink, deleteLink, shortenURL } = require("./controllers/links")
const { registerValidation, loginValidation } = require("./auth/auth")
const { validationMiddleware } = require("./middleware/validation-middleware")
const { CLIENT_URL } = require("./constants")
const { userAuth } = require("./middleware/auth-middleware")

app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.post("/links", userAuth, addLink)
app.delete("/links/:linkid", userAuth, deleteLink)
app.get('/links/:shortCode', userAuth, shortenURL)
app.get('/users/:userid/links', userAuth, getLinks)

app.post('/register', registerValidation, validationMiddleware, register)
app.post("/login", loginValidation, validationMiddleware, login)
app.get('/logout', userAuth, logout)
app.get('/protected', userAuth, protected)

app.listen(5001, () => {
    console.log("Server has started on port 5001")
})

