# swurf-savings-backend

### END GOAL

- Create Mongo database with model files for savings goals, user accounts, and shift data.
- Express API routes that return the necessary JSON data for the front end. 



### User information 
```javascript
{
  _id: ObjectId,

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  time_created: {
    type: Date,
    default: Date.now
  },

  shifts:[{
    _id: ObjectId,
    company: {
      type: String,
      required: true
    },
    income: {
      type: Double,
      required: true
    },
    start_time: {
      type: Date,
      required: true
    },
    end_time: {
      type: Date,
      required: true
    },
    time_created: {
      type: Date,
      default: Date.now
    }
  }
  ],

  savingGoals:[{
    _id: ObjectId,
    title: {
      type: String,
      required: true
    },
    price: {
      type: Double,
      required: true
    },
    price_remaining:{
      type: Double,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    time_created: {
      type: Date,
      default: Date.now
    }
  }],

  achievedSavingGoals:[{
    _id: ObjectId,
    title: {
      type: String,
      required: true
    },
    price: {
      type: Double,
      required: true
    },
    price_remaining:{
      type: Double,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    time_created: {
      type: Date,
      default: Date.now
    }
  }],
};
```
