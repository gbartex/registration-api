const mongoose = require("mongoose");
const router = require("express").Router();

const _ = require("lodash");
const { ObjectID } = require("mongodb");
let { User } = require("./../models/user");

// GET users
router.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      if (!users) {
        return res.status(404).send();
      }
      res.send(users);
    })
    .catch(e => res.status(400).send());
});

// GET user by id
router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  User.findOne({
    _id: id
  })
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(e => res.status(400).send());
});

// POST create new user
router.post("/users", (req, res) => {
  let body = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    zip_code: req.body.zip_code,
    city: req.body.city,
    address: req.body.address,
    home_no: req.body.home_no
  };
  let user = new User({ _id: new mongoose.Types.ObjectId(), ...body });
  user.save().then(
    user_created => {
      res.send(user_created);
    },
    e => {
      console.log(e);
      res.status(400).send(e);
    }
  );
});

router.delete("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) throw new Error(404);
    let user_deleted = await User.findOneAndRemove({ _id: id });
    if (!user_deleted) {
      throw new Error(404);
    }
    res.send(user_deleted);
  } catch (e) {
    res.status(e.message).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if (!ObjectID.isValid(id)) return res.status(404).send();
    let body = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      zip_code: req.body.zip_code,
      city: req.body.city,
      address: req.body.address,
      home_no: req.body.home_no
    };

    let user = await User.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(e.message).send();
  }
});

module.exports = router;
