const mongoose = require("mongoose");
var validator = require("validator");
const Schema = mongoose.Schema;

let userSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: 3,
    trim: true,
    unique: true,
    validate: function(val) {
      return new Promise(function(resolve, reject) {
        resolve(validator.isEmail(val));
      });
    }
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: 2,
    maxlength: 30,
    trim: true,
    validate: {
      validator: function(val) {
        return new Promise((resolve, reject) => {
          resolve(/^[a-ząćęóśżźł\s]+$/i.test(val));
        });
      },
      message: "{VALUE} is not a valid name!"
    }
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: 2,
    maxlength: 30,
    trim: true,
    validate: {
      validator: function(val) {
        return new Promise((resolve, reject) => {
          resolve(/^[a-ząćęóśżźł\s-]+$/i.test(val));
        });
      },
      message: "{VALUE} is not a valid last name!"
    }
  },
  zip_code: {
    type: String,
    trim: true,
    validate: {
      validator: function(val) {
        return new Promise((resolve, reject) => {
          resolve(/^\d{2}-\d{3}$/.test(val));
        });
      },
      message: "{VALUE} is not a valid postal code!"
    }
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(val) {
        return new Promise((resolve, reject) => {
          resolve(/^(?:\(\+?48\))?([\s\)\(-]*\d){9}$/.test(val));
        });
      },
      message: "{VALUE} is not a valid phone no!"
    }
  },
  home_no: {
    type: String,
    trim: true,
    validate: {
      validator: function(val) {
        return new Promise((resolve, reject) => {
          resolve(/^\d{1,3}[a-zA-Z]?$/.test(val));
        });
      },
      message: "{VALUE} is not a valid home no!"
    }
  },
  address: { type: String, minlength: 3, maxlength: 100 },
  city: {
    type: String,
    minlength: 3,
    maxlength: 100
  }
});

let User = mongoose.model("User", userSchema);

module.exports = { User };
