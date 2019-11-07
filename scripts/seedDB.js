const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the books below

mongoose.connect("mongodb+srv://ronak:Masaka60@swurf-savings-5guz5.mongodb.net/test?retryWrites=true&w=majority");

const userSeed = {

    username: "ronak",

    email: "ronak0624@gmail.com",

    password: "password",

    shifts: [{
            income: 55.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:24:00")
        },
        {
            income: 65.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T12:24:00")
        },
        {
            income: 25.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T21:24:00")
        },
        {
            income: 85.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T16:24:00")
        },
        {
            income: 85.45,
            start_time: new Date("1995-10-29T06:24:00"),
            end_time: new Date("1995-10-29T08:14:00")
        },
        {
            income: 45.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:19:00")
        },
        {
            income: 95.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:11:00")
        },
        {
            income: 15.45,
            start_time: new Date("1995-10-29T012:24:00"),
            end_time: new Date("1995-10-29T16:9:00")
        },
        {
            income: 105.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:24:00")
        },
        {
            income: 155.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T12:24:00")
        },

    ],

    savingGoals: [
        {
            title: "New Skis",
            price: 400.65,
            price_remaining: 124.28,
            priority: "1 (I need)"
        }, 
        {
            title: "Airpods",
            price: 150.65,
            price_remaining: 50,
            priority: "2 (I kinda need)"
        }, 
        {
            title: "New Speakers",
            price: 135.99,
            price_remaining: 10,
            priority: "3 (I want)"
        }, 
        {
            title: "New Skis",
            price: 400.65,
            price_remaining: 124.28,
            priority: "1 (I need)"
        }, 
        {
            title: "Airpods",
            price: 150.65,
            price_remaining: 50,
            priority: "2 (I kinda need)"
        }, 
        {
            title: "New Speakers",
            price: 135.99,
            price_remaining: 10,
            priority: "3 (I want)"
        }, 
    ]

}

db.User.collection.save(userSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });