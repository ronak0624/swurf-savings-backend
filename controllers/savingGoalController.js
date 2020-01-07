const db = require("../models");
const mongoose = require("mongoose");
const validateSavingsInput = require("../validation/newSavings");

const PRIORITY_1_PERCENTAGE = 0.5;
const PRIORITY_2_PERCENTAGE = 0.3;
const PRIORITY_3_PERCENTAGE = 0.2;
var getPercentage = function (string) {
    switch (string) {
        case "1 (I need this as fast as possible)":
            proportion = PRIORITY_1_PERCENTAGE;
            break;
        case "2 (I really want this)":
            proportion = PRIORITY_2_PERCENTAGE;
            break;
        case "3 (I want this but don't need it right away)":
            proportion = PRIORITY_3_PERCENTAGE;
            break;
        default:
            null
    }
    return proportion;
}

module.exports = {
    toggleActive: function (req, res) {
        let toggled = "" + req.params.id
        db.User.findOne({
            _id: req.headers.user
        })
        .then(userData => {
            let toggledSavingsGoals = userData.savingsGoals
            for(const i in toggledSavingsGoals){
                // Using == instead of === because _id is an object and parameter _id is a string......
                // Awful and stupid convention here that frankly does not make sense to me but whatever, I guess the MONGODS know best
                if(toggledSavingsGoals[i]._id == toggled){
                    toggledSavingsGoals[i].active = !toggledSavingsGoals[i].active
                }
            }
            db.User
                //Find the user that match the name;
                .findOneAndUpdate({
                    _id: req.headers.user
                },{
                    $set: {
                        savingsGoals: toggledSavingsGoals
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                })
                .then(user => res.status(200).json(user.savingsGoals))
                .catch(err => res.status(422).json(err));
        }).catch(err => res.status(422).json(err));
    },

    validSavingsGoals: function (req, res) {
        if (!req.headers.user) {
            res.status(500).json("You are not logged in")
        }
        db.User
            //Find the user that match the name;
            .findOne({
                _id: req.headers.user
            })
            .then(userData => {
                // Response contains all savings goals that the user has not achieved
                // res.status(200).json(userData.savingsGoals.filter(goal => !goal.isAchieved));
                res.status(200).json(userData.savingsGoals);
            })
            .catch(err => res.status(422).json(err));
    },

    newSavingsGoal: function (req, res) {

        // Check validation
        const {
            errors,
            isValid
        } = validateSavingsInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (!req.headers.user) {
            res.status(403).json("You are not logged in")
        }

        // Setting new savingGoal data
        let newSavingsGoal = {
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            priority: req.body.priority,
            cost: req.body.cost,
            cost_remaining: 0,
            active: true,
            isAchieved: false,
        };

        db.User
            //Find the user that match the name;
            .findOneAndUpdate({
                _id: req.headers.user
            }, {
                $push: {
                    savingsGoals: newSavingsGoal
                }
            }, {
                new: true,
                useFindAndModify: false
            })
            .then(userData => res.status(200).json(userData.savingsGoals))
            .catch(err => res.status(422).json(err));
    },

    removeAllSavingsGoals: function (req, res) {
        let savingsGoals = [];
        db.User
            .findOneAndUpdate({
                _id: req.headers.user
            }, {
                $set: {
                    savingsGoals: savingsGoals
                }
            },{
                new: true,
                useFindAndModify: false
            })
            .then(user => res.status(200).json(user)) // Respond with user object.
            .catch(err => res.status(422).json(err));
    },

    //For /api/:username/savingGoal/:id
    findSavingGoalById: function (req, res) {
        db.User
            .findOne({
                username: req.params.username
            })
            .then(userData => {
                // Find the target savingGoal;
                let targetSavingGoal;
                for (let i = 0; i < userData.savingGoals.length; i++) {
                    if (req.params.id === userData.savingGoals[i].id.toString()) {
                        targetSavingGoal = userData.savingGoals[i];
                        break;
                    }
                }
                res.json(targetSavingGoal);
            })
    },

    deleteSavingGoalById: function (req, res) {
        db.User
            //Find the user that match the name;
            .findOne({
                username: req.params.username
            })
            .then(userData => {
                let allSavingGoals = userData.savingGoals;
                for (let i = 0; i < allSavingGoals.length; i++) {
                    if (req.params.id === allSavingGoals[i].id.toString()) {
                        allSavingGoals[i].isDeleted = true;
                        break;
                    }
                }

                let allValidSavingGoals = [];
                for (let i = 0; i < allSavingGoals.length; i++) {
                    if (!allSavingGoals[i].isDeleted) {
                        allValidSavingGoals.push(allSavingGoals[i])
                    };
                }
                res.json(allValidSavingGoals);
                db.User
                    .findOneAndUpdate({
                        username: req.params.username
                    }, {
                        $set: {
                            savingGoals: allSavingGoals
                        }
                    })
                    .then()
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },
};