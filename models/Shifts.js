const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShiftsSchema = new Schema({
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
    }
  });


// This creates our model from the above schema, using mongoose's model method
var Shifts = mongoose.model("Shifts", ShiftsSchema);

// Export the Shifts model
module.exports = Shifts;