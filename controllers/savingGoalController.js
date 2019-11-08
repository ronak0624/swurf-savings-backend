const db = require("../models");

module.exports = {
    //For /api/:username/savingGoals
    findAllSavingsGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {

            //Remove the savingGoals which are deleted or achieved;
            let allValidSavingGoals = [];
            for (let i = 0; i < userData.savingGoals.length; i++){
                if (!userData.savingGoals[i].isDeleted || !userData.savingGoals[i].isAchieved ){
                    allValidSavingGoals.push(userData.savingGoals[i])
                }
            }
            res.json(allValidSavingGoals);
        })
        .catch(err => res.status(422).json(err));
    },

    postNewSavingGoal:function(req,res){
        let newSavingGoal = req.body;
        console.log(newSavingGoal)
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Setting new savingGoal data;
            newSavingGoal.id = userData.savingGoals.length;
            newSavingGoal.isDeleted = false;
            newSavingGoal.isAchieved = false;
            console.log(newSavingGoal);
            
            //Push new savingGoal to savingGoals array(not in the database yet);
            let allSavingGoals = userData.savingGoals;
            allSavingGoals.push(newSavingGoal);

            //Remove the savingGoals which are deleted by user;
            let allValidSavingGoals = [];
            for (let i = 0; i < allSavingGoals.length; i++){
                if (!allSavingGoals[i].isDeleted || !allSavingGoals[i].isAchieved){
                    allValidSavingGoals.push(allSavingGoals[i])
                }
            }
            res.json(allValidSavingGoals)
            db.User
            .findOneAndUpdate({ username: req.params.username }, { savingGoals : allSavingGoals })
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    removeAllSavingGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOneAndUpdate({ username: req.params.username },{ $set : { savingGoals : [] }})
        .then(userData => res.json(userData.shifts))
        .catch(err => res.status(422).json(err))
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
        .catch(err => res.status(422).json(err));
    },

    updateSavingGoalById:function(req,res){
        db.User
        .findOne({ username: req.params.username })
        .then(userData => {

            // Find the target savingGoal;
            
            for (let i = 0; i < userData.savingGoals.length; i++){
                if (req.params.id === userData.savingGoals[i].id.toString()){
                    switch (req.body){
                        case "delete": 
                    }
                    targetSavingGoal = userData.savingGoals[i];
                    break;
                }
            }
            res.json(targetSavingGoal);
        })
        .catch(err => res.status(422).json(err));
    },
};
