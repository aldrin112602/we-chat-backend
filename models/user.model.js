const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },

    email: {
      type: String,
      required: [true, "Please enter user email"],
      unique: true,
    },

    username: {
      type: String,
      required: [true, "Please enter user username"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter user password"],
    },

    profile: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    age: {
      type: Number,
      min: 0,
    },

    phone: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    zipcode: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    birthdate: {
      type: Date,
    },

    active_status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
