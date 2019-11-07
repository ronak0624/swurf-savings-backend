const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  time_created: {
    type: Date,
    default: Date.now
  },

  shifts:[{
    income: {
      type: Number,
      required: true
    },
    start_time: {
      type: Date,
      required: true
    },
    end_time: {
      type: Date,
      required: true
    },
    time_created: {
      type: Date,
      default: Date.now
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
  }
  ],

  savingGoals:[{
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    price_remaining:{
      type: Number,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    time_created: {
      type: Date,
      default: Date.now
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
    isAchieved:{
      type: Boolean,
      default: false
    }
  }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
