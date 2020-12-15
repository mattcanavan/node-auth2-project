const router = require("express").Router();

const Users = require("./users-model.js");


/// ENDPOINTS
router.get("/", (req, res) => {
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
