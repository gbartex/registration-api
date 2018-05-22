require("./../mongoose")("mongodb://localhost:27017/AddressAppTest");
const mongoose = require("mongoose");

let { User } = require("./models/user");

module.exports = {
  removeAll: async () => {
    return await Promise.all([User.remove({})]);
  },
  createUsers: async users => {
    try {
      let array_promises_users = [];
      users.forEach(user => {
        let _user = new User({
          _id: new mongoose.Types.ObjectId(),
          ...user
        });
        array_promises_users.push(_user.save());
      });
      return await Promise.all(array_promises_users);
    } catch (err) {
      console.log(err);
    }
  },
  getUsers: async emails => {
    return User.find({})
       .where("email")
       .in([...emails])
      .limit(10)
      .sort("-email");
  }
};
