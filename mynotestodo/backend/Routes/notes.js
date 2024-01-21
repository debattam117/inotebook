const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route1: Get all notes using GET "/api/notes/fetchallnotes". Login required because we are using a web token to verify the user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  // Fetch all notes from the database for the authenticated user
  const notes = await Notes.find({ user: req.user.id });
  // Respond with the fetched notes as a JSON object
  res.json(notes);
});

// Route2: Add a new note using POST "/api/notes/addnote". Login required because we are using a web token to verify the user
router.post(
  "/addnote",
  fetchuser,
  [
    // Validation for the title: Minimum length of 3 characters
    body("title", "Enter a valid title").isLength({ min: 3 }),
    // Validation for the description: Minimum length of 5 characters
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Destructure the title, description, and tag from the request body
      const { title, description, tag } = req.body;

      // Check for validation errors
      const errors = validationResult(req);
      // If there are errors, return a 400 Bad Request response with the validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note object with the provided data and the authenticated user's ID
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save the new note to the database
      const savedNote = await note.save();

      // Respond with the saved note as a JSON object
      res.json(savedNote);
    } catch (error) {
      // Log any errors to the console
      console.error(error.message);
      // Return a 500 Internal Server Error response if an error occurs during the process
      res.status(500).send("Internal Server Error");
    }
  }
);



router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

//Usually when you perform update operations in mongoose, it returns the previous state of the document (before it was updated) and not the updated one. 
//By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})



module.exports = router;


/*

difference between this code 


const newUser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
	  
	  
	  
and 


const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });


Save the new note to the database
const savedNote = await note.save();



In summary, the main difference lies in the specific ORM or database library being used and the corresponding methods for creating and saving objects. 
The first snippet suggests the use of a library with a create method, while the second snippet implies a two-step process of creating an object and then saving it,
potentially with a different library or framework.











*/ 