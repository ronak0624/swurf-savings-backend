const db = require("../models");

const SAVING_GOAL_INCOME_PERCENTAGE = 0.5;

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
        .findOne({ _id: req.headers.user })
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
            console.log(newShift, "this is the newShift object");

            //Push new shift to updated shifts array(not in the database yet);
            let allShifts = userData.shifts;
            allShifts.push(newShift);
            res.json(allShifts);

            // console.log(allShifts);
            // //Updating the price_remaining for saving goals;
            let allSavingGoals = userData.savingGoals;

            for(var i = 0 ; i < allSavingGoals.length; i++ ){
                if(!allSavingGoals[i].isDeleted && !allSavingGoals[i].isAchieved){
                    let newPrice = allSavingGoals[i].price_remaining;
                    if(!newPrice){
                        allSavingGoals[i].price_remaining = 0;
                    }
                    newPrice += newShift.earnings * SAVING_GOAL_INCOME_PERCENTAGE * getPercentage(allSavingGoals[i].priority);
                    console.log("Value of newPrice", newPrice)
                    allSavingGoals[i].price_remaining = newPrice;
                    if (newPrice >= allSavingGoals[i].price){
                        allSavingGoals[i].isAchieved = true;
                    }
                }
            }
            console.log('allSavingGoals have been updated!');
            console.log(allSavingGoals);

            // res.json(newShiftData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : { shifts : allShifts , savingGoals : allSavingGoals}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },
    // @POST api/shifts
    newShift:function(req,res){
        let updatedUserShiftsData;
        let newShiftData = req.body;
        db.User
        //Find the user that match the name;
        .findOne({ _id: req.headers.user })
        .then(userData => {
            let activeSavingsGoals = userData.savingsGoals.filter(goal => goal.isActive)

            // Update how much user has left to complete in each savings goal depending on priority
            

            // //Push new shift to updated shifts array(not in the database yet);
            // let allShifts = userData.shifts;
            // allShifts.push(newShift);
            // res.json(allShifts);

            // // console.log(allShifts);
            // // //Updating the price_remaining for saving goals;
            // let allSavingGoals = userData.savingGoals;

            // for(var i = 0 ; i < allSavingGoals.length; i++ ){
            //     if(!allSavingGoals[i].isDeleted && !allSavingGoals[i].isAchieved){
            //         let newPrice = allSavingGoals[i].price_remaining;
            //         if(!newPrice){
            //             allSavingGoals[i].price_remaining = 0;
            //         }
            //         newPrice += newShift.earnings * SAVING_GOAL_INCOME_PERCENTAGE * getPercentage(allSavingGoals[i].priority);
            //         console.log("Value of newPrice", newPrice)
            //         allSavingGoals[i].price_remaining = newPrice;
            //         if (newPrice >= allSavingGoals[i].price){
            //             allSavingGoals[i].isAchieved = true;
            //         }
            //     }
            // }
            // console.log('allSavingGoals have been updated!');
            // console.log(allSavingGoals);

            // // res.json(newShiftData);
            // db.User
            // .findOneAndUpdate({ username: req.params.username }, { $set : { shifts : allShifts , savingGoals : allSavingGoals}})
            // .then()
            // .catch(err => res.status(422).json(err));
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