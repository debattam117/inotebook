const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "IamDebu@123";
var fetchuser = require("../middleware/fetchuser");

////Route:1 create a user using post
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 char in length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user1 = await User.findOne({ email: req.body.email });
    if (user1) {
      return res
        .status(400)
        .json({ errors: "Sorry a user with this mail already exist" });
    }

    const salt = await bcrypt.genSalt(10); //It is generating some random alphanumeric word
    const secPass = await bcrypt.hash(req.body.password, salt); //this code is combining our real password and salt and then converting it into hash

    try {
      const newUser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //console.log(authtoken);
      success=true;
      res.json({ authtoken,success });

      //res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Servers Error");
    }
  }
);

//This code uses async/await for handling the User.create() promise,
//which can make error handling clearer and more straightforward.
//If you're encountering an error regarding try expectations, this updated code structure should resolve that problem.

//Route:2 Login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(), //If we are using password here  body('password',....
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //then we have to use password here also i.e the full   ''password'' word

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //And the word ''password'' here should be the same
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
          pass: user.password,
          name: user.name,
        },
      };
      const a = data.user.id;
      const authtoken = jwt.sign(data, JWT_SECRET);//jwt.sign will give us the authtoken from our given data.
      //console.log(authtoken);
      success=true;
      res.json({success, a, data, authtoken });
    } catch (err) {
      console.error(err);
      res.status(500).send("Servers Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

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












--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The syntax you provided is a part of Express.js, a popular web framework for Node.js. Specifically, this code is defining a route in Express using the post method for the "/login" endpoint. The syntax is as follows:

javascript
Copy code
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // Route handling logic
});
Here's a breakdown:

router.post('/login', ...) defines a route that will handle HTTP POST requests to the "/login" endpoint.

The second parameter, [body('email', 'Enter a valid email').isEmail(), body('password', 'Password cannot be blank').exists()], 

specifies an array of middleware functions. In this case, it's using the express-validator middleware to validate the request body.

body('email', 'Enter a valid email').isEmail(): Checks if the "email" field in the request body is a valid email address.

body('password', 'Password cannot be blank').exists(): Checks if the "password" field exists in the request body.

The third parameter, async (req, res) => { ... }, is an asynchronous function that contains the logic to handle the POST request.

In summary, this code is defining a route for handling login requests, and it includes middleware for input validation using express-validator. The middleware checks that the "email" field is a valid email and that the "password" field exists in the request body. If validation passes, the route handling logic inside the asynchronous function is executed.




------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


*/
