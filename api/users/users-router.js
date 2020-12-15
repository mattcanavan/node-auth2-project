const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(userList => {
      res.json(userList);
    })
    .catch(err => res.send(err));
});

module.exports = router;
