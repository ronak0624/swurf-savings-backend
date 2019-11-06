const db = require("../models");

module.exports = {
    findAllShifts:function(req,res){
        console.log(req.params.username)
        db.User
            .find(req.params.username === db.User.username)
            .then(data => {
                let result = data.shifts.filter(shift => {
                    if(!shift.isDeleted){
                        return shift
                    }
            })
            res.json(result)
        })
        .catch(err => res.status(422).json(err));
    },


    postNewShift:function(req,res){
        db.User
        .findOneAndUpdate({ _user: req.params.user }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },


    findShiftById:function(req,res){
        db.User
            .find({_user: req.params.user})
            .then(dbModel => {
                let shifts = dbModel.shifts
                for(let i = 0; i < shifts.length; i++){
                    if(shifts[i].id === req.params.id){
                        res.json(shifts[i]);
                    }
                }
            })
    },


    removeShift:function(req,res){
        db.User
        .findOneAndUpdate({_user: req.params.user})//code to find body
        .then(dbModel => {
            let shifts = dbModel.shifts
            for(let i = 0; i < shifts.length; i++){
                if(shifts[i].id === req.params.id){
                    res.json(shifts[i]);
                }
            }
        })
},


    findAllSavingsGoals:function(req,res){
        db.User
            .find(req.params.username === db.User.username)
            .then(data => {
                let result = data.savingGoals.filter(savingGoal => {
                    if(!savingGoal.isDeleted && !savingGoal.isAchieved){
                        return shift
                    }
            })
            res.json(result)
        })
        .catch(err => res.status(422).json(err));

    },


    // postNewSavingGoal:function(req,res){
    //     db.User
    //         .find(req.params.username === db.User.username)
    //     TODO:

    // },


    // findSavingGoalById:function(req,res){
    //     db.User
    //         .find(req.params.username === db.User.username)
    //     TODO:

    // },


    // removeSavingGoal:function(req,res){
    //     db.User
    //         .find(req.params.username === db.User.username)
    //     TODO:

    // }




    // findAll: function(req, res) {
    // db.Shifts
    //     .find(req.query)
    //     .sort({ date: -1 })
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // findById: function(req, res) {
    // db.Shifts
    //     .findById(req.params.id)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // create: function(req, res) {
    // db.Shifts
    //     .create(req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // update: function(req, res) {
    // db.Shifts
    //     .findOneAndUpdate({ _id: req.params.id }, req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // remove: function(req, res) {
    // db.Shifts
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }
};