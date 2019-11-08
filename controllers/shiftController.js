const db = require("../models");

module.exports = {

    //For /api/:username/shifts
    findAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Remove the savingGoals which are deleted or achieved;
            let allShifts = userData.shifts;
            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++ ){
                if(!allShifts[i].isDeleted){
                    allValidShifts.push(userData.shifts[i])
                };
            }
            res.json(allValidShifts);
        })
        .catch(err => res.status(422).json(err));
    },

    postNewShift:function(req,res){
        // let updatedUserShiftsData;;
        let newShiftData = req.body.toString();

        db.User
        //Find the user that match the name;
        .findOne({ username: req.params.username })
        .then(userData => {
            // Setting new shift data;
            let newShift = newShiftData;
            newShift.id = userData.shifts.length;
            newShift.isDeleted = false;
            
            //Push new shift to updated shifts array(not in the database yet);
            let allShifts = userData.shifts;
            allShifts.push(newShift);

            //Remove the shifts which are deleted by user;
            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++){
                if (!allShifts[i].isDeleted){
                    allValidShifts.push(allShifts[i])
                }
            }
            // res.json(newShiftData);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { shifts : allValidShifts })
            .then(res.json(allValidShifts))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },

    removeAllShifts:function(req,res){
        db.User
        //Find the user that match the name;
        .findOneAndUpdate({ username: req.params.username },{ $set : { shifts : [] }})
        .then(userData => res.json(userData.shifts))
        .catch(err => res.status(422).json(err))
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

    removeShiftById:function(req,res){
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
            res.json(allShifts);
            let allValidShifts = [];
            for (let i = 0; i < allShifts.length; i++ ){
                if(!allShifts[i].isDeleted){
                    allValidShifts.push(allShifts[i])
                };
            }
            res.json([]);
            db.User
            .findOneAndUpdate({ username: req.params.username }, { $set : {shifts : allValidShifts}})
            .then()
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err)); 
    },


};