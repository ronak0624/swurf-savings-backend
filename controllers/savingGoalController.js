const db = require("../models");

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
            // Setting new savingGoal data;
            let newSavingGoal = newSavingGoalData;
            newSavingGoal.id = userData.savingGoals.length;
            newSavingGoal.isDeleted = false;
            newSavingGoal.isAchieved = false;
            
            //Push new savingGoal to updated savingGoals array(not in the database yet);
            let allSavingGoals = userData.savingGoals;
            allSavingGoals.push(newSavingGoal);

            // res.json(newSavingGoalData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : { savingGoals : allSavingGoals }})
            .then(res.json(allSavingGoals))
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