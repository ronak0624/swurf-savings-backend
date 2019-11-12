const db = require("../models");

const PRIORITY_1_PERCENTAGE= 0.5;
const PRIORITY_2_PERCENTAGE = 0.3;
const PRIORITY_3_PERCENTAGE = 0.2;
var getPercentage = function(string){
    switch (string){
        case "1 (I need this as fast as possible)": proportion = PRIORITY_1_PERCENTAGE; break;
        case "2 (I really want this)": proportion = PRIORITY_2_PERCENTAGE; break;
        case "3 (I want this but don't need it right away)": proportion = PRIORITY_3_PERCENTAGE; break;
        default : null
    }
    return proportion;
}

module.exports = {
    //For /api/:username/savingGoals
    findAllSavingGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => res.json(userData.savingGoals))
        .catch(err => res.status(422).json(err));
    },

    findAllValidSavingGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {

            // Remove the savingGoals which are deleted or achieved;
            let allSavingGoals = userData.savingGoals;
            let allValidSavingGoals = [];
            for (let i = 0; i < allSavingGoals.length; i++ ){
                if(!allSavingGoals[i].isDeleted && !allSavingGoals[i].isAchieved){
                    allValidSavingGoals.push(allSavingGoals[i])
                };
            }
            res.json(allValidSavingGoals);
        })
        .catch(err => res.status(422).json(err));
    },

    postNewSavingGoal:function(req,res){
        // let updatedUserSavingGoalsData;;
        let newSavingGoalData = req.body;
        console.log(newSavingGoalData)
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            //Check validation;
            let totalPercentage = 0;
            for (let i = 0; i < userData.savingGoals.length; i++ ){
                if(!userData.savingGoals[i].isDeleted && !userData.savingGoals[i].isAchieved){
                    //User can only have 1 Priority savingGoal;
                    if (userData.savingGoals[i].priority === "1 (I need this as fast as possible)" && newSavingGoalData.priority === "1 (I need this as fast as possible)"){
                        //TODO:
                        res.send("You already have priority 1.")
                        return;
                    }
                    totalPercentage += getPercentage(userData.savingGoals[i].priority)
                }
            }
            console.log(getPercentage(newSavingGoalData.priority));
            if (totalPercentage + getPercentage(newSavingGoalData.priority) > 1){
                //TODO:
                res.send("You don't have enough savings portions remaining.")
                return;
            }

            // Setting new savingGoal data;
            let newSavingGoal = newSavingGoalData;
            newSavingGoal.id = userData.savingGoals.length;
            newSavingGoal.isDeleted = false;
            newSavingGoal.isAchieved = false;
            
            //Push new savingGoal to updated savingGoals array(not in the database yet);
            let allSavingGoals = userData.savingGoals;
            allSavingGoals.push(newSavingGoal);
            res.json(allSavingGoals)

            // res.json(newSavingGoalData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : { savingGoals : allSavingGoals }})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    removeAllSavingGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            let allSavingGoals = userData.savingGoals;
            for (let i = 0; i < allSavingGoals.length; i++){
                allSavingGoals[i].isDeleted = true;
            }
            res.json(allSavingGoals);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : {savingGoals : allSavingGoals}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    //For /api/:username/savingGoal/:id
    findSavingGoalById:function(req,res){
        db.User
        .findOne({ username: req.params.username })
        .then(userData => {
            // Find the target savingGoal;
            let targetSavingGoal;
            for (let i = 0; i < userData.savingGoals.length; i++){
                if (req.params.id === userData.savingGoals[i].id.toString()){
                    targetSavingGoal = userData.savingGoals[i];
                    break;
                }
            }
            res.json(targetSavingGoal);
        })
    },

    deleteSavingGoalById:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            let allSavingGoals = userData.savingGoals;
            for (let i = 0; i < allSavingGoals.length; i++){
                if (req.params.id === allSavingGoals[i].id.toString()){
                    allSavingGoals[i].isDeleted = true;
                    break;
                }
            }

            let allValidSavingGoals = [];
            for (let i = 0; i < allSavingGoals.length; i++ ){
                if(!allSavingGoals[i].isDeleted){
                    allValidSavingGoals.push(allSavingGoals[i])
                };
            }
            res.json(allValidSavingGoals);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : {savingGoals : allSavingGoals}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },
};