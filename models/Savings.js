const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SavingsSchema = new Schema({
    schema: {
      type: String,
      required: true
    },
    schema: {
      type: String,
      required: true
    },
    schema: {
      type: String,
      required: true
    },

  });


// This creates our model from the above schema, using mongoose's model method
var Savings = mongoose.model("Savings", SavingsSchema);

// Export the Savings model
module.exports = Savings;