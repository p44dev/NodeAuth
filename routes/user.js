const express = require("express")
const { signup, signin, signout } = require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()

router.post('/signup', [
    check("name", /**error*/ "Name at least should be 3 chars").isLength({min: 3}),
    check("email","Email should be valid").isEmail(),
    check("password", "Password at least shoud be 6 characters").isLength({min: 6}),
], signup)

router.post('/signin', signin)

router.get('/signout', signout)


module.exports = router 