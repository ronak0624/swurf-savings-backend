const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

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

  shifts:{
    type: Array,
    require:false
  },
  
  // [{
  //   income: {
  //     type: Number,
  //     required: true
  //   },
  //   start_time: {
  //     type: Date,
  //     required: true
  //   },
  //   end_time: {
  //     type: Date,
  //     required: true
  //   },
  //   time_created: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   isDeleted:{
  //     type: Boolean,
  //     default: false
  //   },
  // }],

  savingGoals:{
    type: Array,
    require:false
  }
    
  // [{
  //   title: {
  //     type: String,
  //     required: true
  //   },
  //   price: {
  //     type: Double,
  //     required: true
  //   },
  //   price_remaining:{
  //     type: Double,
  //     required: true
  //   },
  //   priority: {
  //     type: String,
  //     required: true
  //   },
  //   time_created: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   isDeleted:{
  //     type: Boolean,
  //     default: false
  //   },
  //   isAchieved:{
  //     type: Boolean,
  //     default: false
  //   }
  // }],
});

module.exports = User = mongoose.model("users", UserSchema);
