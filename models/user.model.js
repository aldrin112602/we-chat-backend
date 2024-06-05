const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter user name"],
        },

        email: {
            type: String,
            required: [true, "Please enter user email"],
        },

        username: {
            type: String,
            required: [true, "Please enter user username"],
        },

        password: {
            type: String,
            required: [true, "Please enter user password"],
        },

        profile: {
            type: String,
            required: false,
        },

        address: {
            type: String,
            required: false,
        },

        bio: {
            type: String,
            required: false,
        },

        gender: {
            type: String,
            required: false,
        },

        age: {
            type: Number,
            required: false,
        },

        phone: {
            type: String,
            required: false,
        },

        city: {
            type: String,
            required: false,
        },

        state: {
            type: String,
            required: false,
        },

        zipcode: {
            type: String,
            required: false,
        },

        country: {
            type: String,
            required: false,
        },

        birthdate: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;