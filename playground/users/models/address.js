const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let zipSchema = Schema({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  zip_code: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{3}/.test(v);
      },
      message: "{VALUE} is not a valid postal code!"
    },
    required: [true, "Postal number required"]
  },
  address: { type: String, minlength: 3, maxlength: 120 },
  province: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: [true, "Province required"]
  },
  city: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: [true, "City required"]
  }
});

let ZipCode = mongoose.model("ZipCode", zipSchema);

module.exports = { ZipCode };
