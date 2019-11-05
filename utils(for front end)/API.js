import axios from "axios";

export default {

  //Get all shifts of certain user:
  getShifts: function(username) {
    return axios.get("/api/:" + username + "/shifts");
  },

  //Get certain shift of certain user:
  getShift: function(username,shiftId){
    return axios.get("/api/:" + username + "/shift/" + shiftId);
  },


  //Submit a new shift certain user:
  postShifts: function(username,shiftsData){
    return axios.post("/api/:" + username + "/shifts",shiftsData);
  },

  //Delete certain shift from certain user:
  deleteShift: function(username,shiftsId){
    return axios.delete("/api/:" + username + "/shift/"+shiftsId);
  },

  //Get all saving goals of certain user:
  getSavings: function(username) {
    return axios.get("/api/:" + username + "/savings");
  },

  //Add a new saving goal of certain user:
  postSaving: function(username,savingData) {
    return axios.post("/api/:" + username + "/savings",savingData);
  },

  //Delete certain saving goal from certain user:
  deleteShift: function(username,shiftsId){
    return axios.delete("/api/:" + username + "/saving/"+shiftsId);
  },
};
