# Swurf-Savings-Backend

We are Swurf Savings: a savings tool made by rideshare drivers, for rideshare drivers.

Swurf Savings is a web application that allows users to track their progress toward different savings goals with three tiers of importance based on what they prioritize.  The user has the ability to add/store their driving shifts which will impact the progress bars for each goal, calculated using its selected priority.  Using average shift income, which changes every time the user uploads a shift, the app provides accurate updates to the number of shifts required to reach a savings goal.

## End Goal

- Create Mongo database with model files for savings goals, user accounts, and shift data.
- Express API routes that return the necessary JSON data for the front end. 

## Getting Started

In the project directory, you can run `npm start`, which runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

You will also see any errors logged in the console.

See deployment for notes on how to deploy the project on a live system.

### Installing

In your terminal, you will run `npm install` to install the project's dependencies to your local machine.

The frontend runs on a remote server; you can view the repository [here](https://github.com/ronak0624/swurf-savings)

### Data Stucture
For each user, he/she has the following properties:
- username
- email
- password
- time-created (auto-created)
- shifts (Array) 
  > Each shift in shifts array has the following properties:
  - income
  - start_time
  - end_time
  - time_created (auto-created)
  - isDeleted (default: false. The user can delete the shift after he posted it. This record will still stay is the shifts array, but it will not be used for calculation.)

- savingGoals (Array) 
  > Each savingGoal in savingGoals array has the following properties:
  - title
  - price 
  - price_remaining (will decrease everytime when the user post a new shift.)
  - priority (1/2/3)
  - time_created (auto-created)
  - isDeleted (default: false. The user can delete the savingGoal after he posted it. This record will still stay in the savingGoals array, but it will not be used for calculation.)
  - isAchieved (default: false. When the price_remaining of certain savingGoal <= 0, the isAchieved value will change to true.   This record will still stay is the savingGoals array, but it will not be used for the future calculation. )

### Main Logic

### All API ROUTES

## Tech We used

* Express
* Controllor
* Mongoose
* Mongo DB Atlas
* Login Authentication
* Postman

## Authors

* **Ronak Patel**
* **Andrew Lin**
* **Leah Munson**
* **Nicole Roberts**
