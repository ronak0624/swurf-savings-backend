const axios = require("axios");

const URL = "localhost:5000";

module.export = {

  //Get all shifts of certain user:
  findAllShifts: function(username) {
    return axios.get(URL + "/api/:" + username + "/allShifts");
  },

  //Get all valid shifts of certain user:
  findAllValidShifts: function(username) {
    return axios.get(URL + "/api/:" + username + "/shifts");
  },
  
  //Submit a new shift of certain user:
  postNewShift: function(username,shiftsData){
    return axios.post(URL + "/api/:" + username + "/shifts",shiftsData);
  },

  //Remove all shifts of certain user
  removeAllShifts: function(username){
    return axios.delete(URL + "/api/:" + username + "/shifts");
  },
  
  //Get certain shift of certain user:
  findShiftById: function(username,shiftId){
    return axios.get(URL + "/api/:" + username + "/shift/" + shiftId);
  },

  //Delete certain shift from certain user:
  deleteShiftById: function(username,shiftsId){
    return axios.delete(URL + "/api/:" + username + "/shift/"+shiftsId);
  },

  //Get all saving goals of certain user:
  findAllSavingGoals: function(username) {
    return axios.get(URL + "/api/:" + username + "/allSavingGoals");
  },

  //Get all valid saving goals of certain user:
  findAllValidSavingGoals: function(username) {
    return axios.get(URL + "/api/:" + username + "/savingGoals");
  },

  //Add a new saving goal of certain user:
  postNewSavingGoal: function(username,savingData) {
    return axios.post(URL + "/api/:" + username + "/savingGoals", savingData);
  },

  //Delete all savings goals of certain user:
  removeAllSavingGoals: function(username){
    return axios.delete(URL + "/api/:" + username + "/savingGoals/");
  },

  //Get certain saving goal of certain user:
  findSavingGoalById: function(username,savingGoalId) {
    return axios.get(URL + "/api/:" + username + "/savingGoals/" + savingGoalId);
  },

  //Delete certain saving goal of certain user:
  deleteSavingGoalById: function(username,shiftsId){
    return axios.delete(URL + "/api/:" + username + "/savingGoals/" + savingGoalId);
  },

  //Calculating average income
  getAverageShiftIncome: function(username){
    let totalIncome = 0;
    let totalHoursWorked = 0;

    axios
    .get(URL + "/api/" + username + "/shifts")
    .then(res => {
      let shiftsArray = res.shifts;
      for (let i = 0; i < shiftsArray.length; i++){
        totalIncome += shiftsArray[i].income;
      }
      for (let i = 0; i < shiftsArray.length; i++){
        let hours = 3;
        totalHoursWorked += hours;
        totalShiftsWorked = totalHoursWorked / 3;
      }
      return totalIncome / totalShiftsWorked;
    })
  },

  getShiftsRemainingForSavingGoals: function(username){
    axios
    .get(URL + "/api/" + username + "/savingGoals")
    .then(res => {
      let savingGoalsArray = res.savingGoals;
      ShiftsRemainingArray = [];
      AverageShiftIncome = getAverageShiftIncome(username);
      for (let i = 0; i < savingGoalsArray.length; i++){
        let shiftsRemaining = savingGoalsArray[i].price_remaining / AverageShiftIncome;
        ShiftsRemainingArray.push(shiftsRemaining);
      }
      return ShiftsRemainingArray;
    })
  },
};
