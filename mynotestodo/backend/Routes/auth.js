const express = require('express');
const router = express.Router();
const User=require('../models/User.js');
const { body, validationResult } = require('express-validator');

//create a user using post 
router. post ('/createuser',[

body('name','Enter a valid name').isLength({min:3}),
body('email','Enter a valid email').isEmail(),
body('password','Password must be 5 char in length').isLength({min:5}),

] , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user1=await User.findOne({email:req.body.email})
    if(user1)
    {
        return res.status(400).json({ errors: "Sorry a user with this mail already exist" });
    }

    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Servers Error');
    }
});

//This code uses async/await for handling the User.create() promise, 
//which can make error handling clearer and more straightforward. 
//If you're encountering an error regarding try expectations, this updated code structure should resolve that problem.
    
    
module.exports = router






// const result = validationResult(req);
// if (result.isEmpty()) {
//     return res.status(400).json({errors:errors.array()});
//   }
//   User.create({
//     name: req.body.name,
//     password: req.body.password,
//     email: req.body.email
// }).then(user => res.json(user));




// obj = {
//     a: 'thios',
//     number: 34
//     }

//     res.json (obj)//returning the json object as response
//     console.log(req.body);



/*

--Code Explanation--------------------------

1. Imports and Setup:

javascript
Copy code
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
It imports necessary modules: express for the router, User model from a file (presumably a database model), and express-validator for validating incoming data.


2. Route Definition:

javascript
Copy code
router.post('/', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    // Route handling logic
});
This sets up a POST route at the root ('/') of this router.
express-validator checks incoming data:
name: Checks if it has a minimum length of 3 characters.
email: Checks if it's a valid email format.
password: Checks if it has a minimum length of 5 characters.


3. Handling Route Logic:

javascript
Copy code
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
Validates incoming data against defined validation rules.
If there are validation errors, it sends a 400 Bad Request response with details of the errors in JSON format.


4.Creating a New User:

javascript
Copy code
try {
    const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    res.json(newUser);
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
If the data passes validation, it attempts to create a new user using the User.create() method (assuming it's a database operation).
If successful, it responds with the newly created user in JSON format.
If there's an error during the creation process, it catches the error, logs it, and sends a generic 500 Server Error response.



5.Exporting the Router:

javascript
Copy code
module.exports = router;
Finally, it exports the router with all defined routes and middleware.
This code essentially sets up an Express route to create a new user with validation checks for name, email, and password lengths, and it uses async/await for handling asynchronous operations like database interactions



{
"name":"",
"email":"debattam117gmail.com",
"password":"dsadsdfdv"
}



*/ 