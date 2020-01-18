# Swurf-Savings-Backend

We are Swurf Savings: a savings tool made by ride-share drivers, for ride-share drivers.

Swurf Savings is a web application that allows users to track their progress toward different savings goals with three tiers of importance based on what they prioritize.  The user has the ability to add/store their driving shifts which will impact the progress bars for each goal, calculated using its selected priority.  Using average shift income, which changes every time the user uploads a shift, the app provides accurate updates to the number of shifts required to reach a savings goal.


* [End Goal](#end-goal)
* [Getting Started](#getting-started)
* [Data Structure](#data-structure)
* [Main Logic](#main-logic)
* [API Routes](#api-routes)
* [Stretch Goals](#stretch-goals)
* [Tech We Used](#tech-we-used)
* [Authors](#authors)


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


## Data Structure

For each user, he/she has the following properties:
- username
- email
- password
- time-created (auto-created)

- shifts (Array) 
  > Each shift in shifts array has the following properties:
  - id
  - income
  - start_time
  - end_time
  - time_created (auto-created)
  - isDeleted (default: false. The user can delete the shift after he posted it. This record will still stay is the shifts array, but it will not be used for calculation.)
  
- savingGoals (Array) 
  > Each savingGoal in savingGoals array has the following properties:
  - id
  - title
  - price 
  - price_remaining (will decrease every time when the user post a new shift.)
  - priority (1/2/3)
  - time_created (auto-created)
  - isDeleted (default: false. The user can delete the savingGoal after he posted it. This record will still stay in the savingGoals array, but it will not be used for calculation.)
  - isAchieved (default: false. When the price_remaining of certain savingGoal <= 0, the isAchieved value will change to true.   This record will still stay is the savingGoals array, but it will not be used for the future calculation. )


## Main Logic

![Image of Logic](https://i.ibb.co/2kwHczF/logic.png)

e.g. 
- John has 3 savingGoals
  - Priority 1: A new iPhone 11 ($699)
  - Priority 2: A new Bike ($300)
  - Priority 3: A new jacket for his dad ($100)
- He finished a new shift from 6pm -9pm. He got $100 totally, and he posted it on Swurf. He needs 50% of the income ($50) for basic living, and Within the remaining $50:
  - 50% ($25) is for his priority 1 savingGoal(new iPhone 11)
  - 30% ($15) is for his priority 2 savingGoal(new bike)
  - 20% ($10) is for his priority 3 savingGoal(new jacket)
- Now the price_remaining for each savingGoal changed:
  - Priority 1: A new iPhone 11 ($699 - $25 = $674)
  - Priority 2: A new Bike ($300 - $15 = $285)
  - Priority 3: A new jacket for his dad ($100 - $10 = $90) 
- We use averageShiftIncome = totalIncome / totalShiftWorked to calculate the averageShiftIncome, and use shiftRemaining = price_remaining / (averageShiftIncome * 50% * priority）to calculate the shiftRemaining for certain savingGoal.


## API Routes
For shifts：
- Get all shifts of certain user (including deleted shifts)
  - URL: /:username/allShifts
  - Method: GET
- Get all shifts of certain user (not including deleted shifts)
  - URL: /:username/shifts
  - Method: GET  
- Delete all shifts of certain user
  - URL: /:username/shifts
  - Method: DELETE
- Post a new shift of certain user
  - URL: /:username/shifts
  - Method: POST
  
- Get certain shift of certain user by id
  - URL: /:username/shift/:id
  - Method: GET
- Delete certain shift of certain user by id
  - URL: /:username/shift/:id
  - Method: DELETE

For saving goals：
- Get all saving goals of certain user (including deleted or achieved saving goals)
  - URL: /:username/allSavingGoals
  - Method: GET
- Get all saving goals of certain user (not including deleted or achieved saving goals)
  - URL: /:username/savingGoals
  - Method: GET
- Delete all saving goals of certain user
  - URL: /:username/savingGoals
  - Method: DELETE
- Post a new saving goal of certain user
  - URL: /:username/savingGoals
  - Method: POST
  
- Get certain saving goal of certain user by id
  - URL: /:username/savingGoal/:id
  - Method: GET
- Delete certain saving goal of certain user by id
  - URL: /:username/savingGoal/:id
  - Method: DELETE

## Stretch Goals

- Use Plaid API for bank account linking.
- Use Uber driver and other API to submit new shift automatically.
- Use different calculation for rush hour & non rush hour.

## Tech We Used

* Express
* Controller
* Mongoose
* Mongo DB Atlas
* Login Authentication
* Postman

## Authors
* [**Ronak Patel**](https://github.com/ronak0624)
* [**Andrew Lin**](https://github.com/andrewlin618)
* **Leah Munson**
* **Nicole Roberts**
