const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");
const { makeToken } = require("./make-token.js");

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

/// ENDPOINTS
router.post("/register", (req,res) => {
    // :PORT/api/auth/register

    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS;

        //hash the password
        const hash = bcryptjs.hashSync(credentials.password, parseInt(rounds)); //why is the salt a string?
        credentials.password = hash;

        //save the new user to the db
        Users.add(credentials)
        .then(newUser => {
            res.status(201).json({ data: newUser })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })

    } else {
        res.status(400).json({ message: "Required field(s) Username AND/OR Password missing from req.body"})
    }
})

router.post("/login", (req,res) => {
    // :PORT/api/auth/login

    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
        .then(data => {
            const [user] = data; //sets user to first item in data collection (only one item/obj will ever be returned)

            if (user && bcryptjs.compareSync(password, user.password)) {

                //create a token
                const token = makeToken(user)

                //send token to browser
                res.status(200).json({ message: "Welcome to the API, " + user.username, token});
            } else {
                //bad password or username
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(error => {
            //general server error
            res.status(500).json({ message: error.message })
        })
    } else {
        res.status(400).json({ message: "Required field(s) Username AND/OR Password missing from req.body"})
    }
})

router.post("/logout", (req,res) => {
    // :PORT/api/auth/logout
})

module.exports = router;