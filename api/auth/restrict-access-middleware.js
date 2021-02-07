const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets");

module.exports = (req, res, next) => {
  // pull the token from header
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: "missing required token inside of req.headers.authorization."})
  } else {
    // verify the token provided
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json("bad token: " + err.message)
      } else {
        // token valid (and not expired). tack the decoded token to req and proceed
        // req.decodedToken = decoded; // why are we doing this?
        next()
      }
    })
  }
};
