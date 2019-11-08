const db = require("../models");

module.exports = {
    findAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Remove the savingGoals which are deleted or achieved;
            let allValidShifts = [];
            for (let i = 0; i < userData.shifts.length; i++ ){
                if(userData.shifts[i].isDelete){
                    allValidShifts.push(userData.shifts[i])
                };
            }
            res.json(userData);
        })
        .catch(err => res.status(422).json(err));
    },

    postNewShift:function(req,res){
        // let updatedUserShiftsData;
        // let newShiftData = req.body;

        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Setting new shift data;
            console.log(req.body.stringify());

            let newShift = req.body;
            newShift.id = userData.shifts.length;
            newShift.isDelete = false;
            console.log(newShift);
            
            //Push new shift to updated shifts array(not in the database yet);
            let allShifts = userData.shifts;
            allShifts.push(newShift);

            //Remove the shifts which are deleted by user;
            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++){
                if (!allShifts[i].isDelete){
                    allValidShifts.push(allShifts[i])
                }
            }
            // console.log("/////////////" + updatedUserShiftsData)
            // res.json(newShiftData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { shifts : allValidShifts })
            .then(res.json(allValidShifts))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

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

   // removeShift:function(req,res){
//         db.User
//         .findOneAndUpdate({_user: req.params.user})//code to find body
//         .then(dbModel => {
//             let shifts = dbModel.shifts
//             for(let i = 0; i < shifts.length; i++){
//                 if(shifts[i].id === req.params.id){
//                     res.json(shifts[i]);
//                 }
//             }
//         })
// },

    findAllSavingsGoals:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {

            //Remove the savingGoals which are deleted or achieved;
            let allValidSavingGoals = [];
            for (let i = 0; i < userData.savingGoals.length; i++){
                if (!userData.savingGoals[i].isDelete || !userData.savingGoals[i].isAchieved ){
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
            newSavingGoal.isDelete = false;
            newSavingGoal.isAchieved = false;
            console.log(newSavingGoal);
            
            //Push new savingGoal to savingGoals array(not in the database yet);
            let allSavingGoals = userData.savingGoals;
            allSavingGoals.push(newSavingGoal);

            //Remove the savingGoals which are deleted by user;
            let allValidSavingGoals = [];
            for (let i = 0; i < allSavingGoals.length; i++){
                if (!allSavingGoals[i].isDelete || !allSavingGoals[i].isAchieved){
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

    // removeSavingGoal:function(req,res){
    // },
    // removeAllShifts:function(req,res){
    //     db.User
    //     //Find the user that match the name;
    //     .findOneAndUpdate({ username: req.params.username },{$set:{shifts:[]}})
    //     .then()
    //     .catch(err => res.status(422).json(err));
    // },

    
};
