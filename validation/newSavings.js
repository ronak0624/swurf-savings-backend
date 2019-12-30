const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSavingsInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.priority = !isEmpty(data.priority) ? data.priority : "";
  data.user_id= !isEmpty(data.user_id) ? data.user_id: "";

  // Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Please enter a title";
  }

  // Priority checks
  if (Validator.isEmpty(data.priority)) {
    errors.priority = "Please enter a priority";
  } 

  // costchecks
  if (data.cost === 0) {
    errors.cost= "Please enter the cost of your goal";
  }

  if (Validator.isEmpty(data.user_id)) {
    errors.user_id= "You are not logged in";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
