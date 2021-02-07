const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restrict-access-middleware.js");

/// ENDPOINTS
router.get("/", restricted, (req, res) => {
  // :PORT/api/users
  Users.find()
    .then(userList => {
      res.status(200).json(userList);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    })
});

module.exports = router;
