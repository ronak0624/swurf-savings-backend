const db = require("../models");

const SAVING_GOAL_INCOME_PERCENTAGE = 0.3;
const PRIORITY_1_PERCENTAGE= 0.5;
const PRIORITY_2_PERCENTAGE = 0.3;
const PRIORITY_3_PERCENTAGE = 0.2;

module.exports = {
    //For /api/:username/shifts
    findAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => res.json(userData.shifts))
        .catch(err => res.status(422).json(err));
    },

    findAllValidShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {

            // Remove the savingGoals which are deleted or achieved;
            let allShifts = userData.shifts;
            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++ ){
                if(!allShifts[i].isDeleted){
                    allValidShifts.push(allShifts[i])
                };
            }
            res.json(allValidShifts);
        })
        .catch(err => res.status(422).json(err));
    },

    postNewShift:function(req,res){
        // let updatedUserShiftsData;;
        let newShiftData = req.body;
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Setting new shift data;
            let newShift = newShiftData;
            newShift.id = userData.shifts.length;
            newShift.isDeleted = false;
            console.log(newShift)

            //Push new shift to updated shifts array(not in the database yet);
            let allShifts = userData.shifts;
            allShifts.push(newShift);
            res.json(allShifts)

            // console.log(allShifts);
            // //Updating the price_remaining for saving goals;
            // let allSavingGoals = userData.savingGoal;
            // for(var i = 0 ; i < allSavingGoals.length; i++ ){
            //     let proportion;
            //     switch (allSavingGoals[i].priority){
            //         case "1 (I need)": proportion = PRIORITY_1_PERCENTAGE; break;
            //         case "2 (I kinda need)": proportion = PRIORITY_2_PERCENTAGE; break;
            //         case "3 (I want)": proportion = PRIORITY_3_PERCENTAGE; break;
            //         // default : console.log('WTF')
            //     }
            //     allSavingGoals[i].price_remaining -= newShift.income * SAVING_GOAL_INCOME_PERCENTAGE * proportion;
            // }

            // res.json(newShiftData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : { shifts : allShifts }})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    removeAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            let allShifts = userData.shifts;
            for (let i = 0; i < allShifts.length; i++){
                allShifts[i].isDeleted = true;
            }
            res.json(allShifts);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : {shifts : allShifts}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    //For /api/:username/shift/:id
    findShiftById:function(req,res){
        db.User
        .findOne({ username: req.params.username })
        .then(userData => {
            // Find the target shift;
            let targetShift;
            for (let i = 0; i < userData.shifts.length; i++){
                if (req.params.id === userData.shifts[i].id.toString()){
                    targetShift = userData.shifts[i];
                    break;
                }
            }
            res.json(targetShift);
        })
    },

    deleteShiftById:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            let allShifts = userData.shifts;
            for (let i = 0; i < allShifts.length; i++){
                if (req.params.id === allShifts[i].id.toString()){
                    allShifts[i].isDeleted = true;
                    break;
                }
            }

            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++ ){
                if(!allShifts[i].isDeleted){
                    allValidShifts.push(allShifts[i])
                };
            }
            res.json(allValidShifts);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : {shifts : allShifts}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },


};