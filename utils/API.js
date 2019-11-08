const axios = require("axios");

const URL = "localhost:5000";

module.export = {

  //Get all shifts of certain user:
  getShifts: function(username) {
    return axios.get("/api/:" + username + "/shifts");
  },


  //Get certain shift of certain user:
  getShift: function(username,shiftId){
    return axios.get("/api/:" + username + "/shift/" + shiftId);
  },


  //Submit a new shift certain user:
  postShift: function(username,shiftsData){
    // TODO: Change the savingGoals' remaining price
    return axios.post("/api/:" + username + "/shifts",shiftsData);
  },


  //Delete certain shift from certain user:
  deleteShift: function(username,shiftsId){
    // TODO: Change the savingGoals' remaining price
    return axios.delete("/api/:" + username + "/shift/"+shiftsId);
  },


  //Get all saving goals of certain user:
  getSavingGoals: function(username) {
    return axios.get("/api/:" + username + "/savings");
  },


  //Get certain saving goal of certain user:
  getSavingGoal: function(username,savingGoalId) {
    return axios.get("/api/:" + username + "/saving/" + savingGoalId);
  },


  //Add a new saving goal of certain user:
  postSavingGoal: function(username,savingData) {
    return axios.post("/api/:" + username + "/savings", savingData);
  },


  //Delete certain saving goal from certain user:
  deleteSavingGoal: function(username,shiftsId){
    return axios.delete("/api/:" + username + "/saving/"+shiftsId);
  },
  //Calculating average income
  updateAverageShiftIncome: function(username){
    let totalIncome = 0;
    let totalHoursWorked = 0;

    axios.get(URL + "/api/" + username + "shifts").then(res => {
      let shiftsArray = res.shifts
      for (let i = 0; i < shiftsArray.length; i++){
        totalIncome += shiftsArray[i].income;
      }
      for (let i = 0; i < shiftsArray.length; i++){
        let hours = 3;
        totalHoursWorked += hours;
      }
      return totalIncome / totalHoursWorked;
    })
  },


  shiftsRemaining: function(user){
    //TODO:
    // let totalIncome = 0;
    // for (let i = 0; i < user.shifts.length; i++){
    //   totalIncome += user.shifts[i].income;
    // }

    // let totalHoursWorked = 0;

    // for (let i = 0; i < user.shifts.length; i++){
    //     let hours = user.shifts[i].start_time - user.shifts[i].end_time;
    //     totalHoursWorked += hours;
    // }
    // let totalShifts = totalHoursWorked / 3;
    // let averageShiftIncome = totalIncome / totalShifts;
    // let shiftsRemaining = 
  }
};