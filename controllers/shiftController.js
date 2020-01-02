const db = require("../models");

const SAVING_GOAL_INCOME_PERCENTAGE = 0.5;

module.exports = {
    //For /api/:username/shifts
    findAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ _id: req.headers.user })
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
        let updated_user_shifts_data;
        let new_shift_data = req.body;
        db.User
        //Find the user that match the name;
        .findOneAndUpdate({
            _id: req.headers.user
        }, {
            $push: {
                shifts: new_shift_data
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        .then(userData => {
            let all_savings_goals = userData.savingsGoals
            // Divide total percentage of earnings dedicated to savings by how many active goals a user has
            // Then add this percentage multiplied by the shift earnings to each goal
            let savings_per_goal = SAVING_GOAL_INCOME_PERCENTAGE / userData.savingsGoals.filter(goal => goal.active).length;
            for (i = 0;i < all_savings_goals.length; i++){
                let current_goal = all_savings_goals[i]
                if(current_goal.active){
                    all_savings_goals[i].cost_remaining += savings_per_goal * new_shift_data.earnings
                }
                if(current_goal.cost_remaining > current_goal.cost){
                    current_goal.isAchieved = true;
                    current_goal.active = false;
                    current_goal.cost_remaining = current_goal.cost
                }
                all_savings_goals[i] = current_goal
            }
            db.User
            .findOneAndUpdate({ _id: req.headers.user }, { $set : {savingsGoals : all_savings_goals}}, {new: true})
            .then(user => res.status(200).json(user))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    removeAllShifts:function(req,res){
        let shifts = [];
        db.User
            .findOneAndUpdate({
                _id: req.headers.user
            }, {
                $set: {
                    shifts: shifts
                }
            },{
                new: true,
                useFindAndModify: false
            })
            .then(user => res.status(200).json(user)) // Respond with user object.
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