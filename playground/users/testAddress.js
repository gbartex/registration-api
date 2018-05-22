require("./../mongoose")("mongodb://localhost:27017/AddressAppTest");
const mongoose = require("mongoose");

let { ZipCode } = require("./models/address");

module.exports = {
  removeAll: async () => {
    return await Promise.all([ZipCode.remove({})]);
  },
  createAddresses: async addresses => {
    try {
      let array_promises_addresses = [];
      addresses.forEach(address => {
        let _address = new ZipCode({
          _id: new mongoose.Types.ObjectId(),
          ...address
        });
        array_promises_addresses.push(_address.save());
      });
      return await Promise.all(array_promises_addresses);
    } catch (err) {
      console.log(err);
    }
  },
  getZips: async codes => {
    return ZipCode.find({zip_code:/00-001/})
      // .where("zip_code")
      // .in([...codes])
      .limit(10)
      .sort("-zip_code");
  }
};
