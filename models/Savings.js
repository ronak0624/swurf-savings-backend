const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SavingsSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Double,
      required: true
    },
    priority: {
      type: Integer,
      required: true
    },

  });


// This creates our model from the above schema, using mongoose's model method
var Savings = mongoose.model("Savings", SavingsSchema);

// Export the Savings model
module.exports = Savings;