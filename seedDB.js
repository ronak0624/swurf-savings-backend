const mongoose = require("mongoose");
const db = require("./models");

// This file empties the Users collection and inserts the books below

mongoose.connect("mongodb+srv://ronak:Masaka60@swurf-savings-5guz5.mongodb.net/test?retryWrites=true&w=majority");

const userSeed = {

    username: "ronak",

    email: "ronak0624@gmail.com",

    password: "password",

    shifts: [{
            id: 0,
            income: 55.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:24:00"),
            isDeleted:false 
        },
        {
            id: 1,
            income: 65.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T12:24:00"),
            isDeleted:false 
        },
        {
            id: 2,
            income: 25.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T21:24:00"),
            isDeleted:false 
        },
        {
            id: 3,
            income: 85.45,
            start_time: new Date("1995-10-29T10:24:00"),
            end_time: new Date("1995-10-29T16:24:00"),
            isDeleted:false 
        },
        {
            id: 4,
            income: 85.45,
            start_time: new Date("1995-10-29T06:24:00"),
            end_time: new Date("1995-10-29T08:14:00"),
            isDeleted:false 
        },
        {
            id: 5,
            income: 45.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:19:00"),
            isDeleted:false 
        },
        {
            id: 6,
            income: 95.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:11:00"),
            isDeleted:false 
        },
        {
            id: 7,
            income: 15.45,
            start_time: new Date("1995-10-29T012:24:00"),
            end_time: new Date("1995-10-29T16:9:00"),
            isDeleted:false 
        },
        {
            id: 8,
            income: 105.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T08:24:00"),
            isDeleted:false 
        },
        {
            id: 9,
            income: 155.45,
            start_time: new Date("1995-10-29T03:24:00"),
            end_time: new Date("1995-10-29T12:24:00"),
            isDeleted:false 
        },

    ],

    savingGoals: [
        {
            id: 0,
            title: "New Skis",
            price: 400,
            price_remaining: 400,
            priority: "1 (I need)",
            isDeleted:false,
            isAchieved:false
        }, 
        {
            id: 1,
            title: "Airpods",
            price: 100,
            price_remaining: 100,
            priority: "2 (I kinda need)",
            isDeleted:false,
            isAchieved:false
        }, 
        {
            id: 2,  
            title: "New Speakers",
            price: 50,
            price_remaining: 50,
            priority: "3 (I want)",
            isDeleted:false,
            isAchieved:false
        }, 
        {
            id: 3,
            title: "New Skis",
            price: 400.65,
            price_remaining: 124.28,
            priority: "1 (I need)",
            isDeleted:false,
            isAchieved:false
        }, 
        {
            id: 4,
            title: "Airpods",
            price: 150.65,
            price_remaining: 50,
            priority: "2 (I kinda need)",
            isDeleted:false,
            isAchieved:false
        }, 
        {
            id: 5,
            title: "New Speakers",
            price: 135.99,
            price_remaining: 10,
            priority: "3 (I want)",
            isDeleted:false,
            isAchieved:false
        }, 
    ]

}

// db.User.collection.remove({},function(err){
//     if (err) throw (err);
//     console.log('Users removed!')
// })

db.User.collection.remove()
    .then(() => {
        console.log('User removed');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.User.collection.save(userSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });