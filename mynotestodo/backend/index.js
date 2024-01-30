const connectToMongo=require('./data');
const express = require('express');

connectToMongo();



const app = express()
const port = 5000

app.use(express.json());//I have used a middle ware to send body as request from the link.


//available routes

app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))

app.listen(port, () => {
  console.log(`Inotebook backend listening at http://localhost:${port}`)
})




//---------------------------------------------------------------------------------------Comment------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// const connectToMongo=require('./data');
// This line imports the connectToMongo function from a file or module located in the current directory under the name 'data'. The require() function is a CommonJS method used in Node.js to import modules.
// ------------------------------------------------------
// 
// const express = require('express');
// This line imports the express module, which is a popular web framework for Node.js used to build web applications.
// ------------------------------------------------------
// 
// connectToMongo();
// This line invokes the connectToMongo function that was imported earlier. It presumably connects to a MongoDB database as indicated by its name, but the specifics of that function are within the 'data' module that was imported previously.
// ------------------------------------------------------
// 
// const app = express()
// This line initializes an instance of the express application, creating a new Express application and assigning it to the variable app.
// ------------------------------------------------------
// 
// const port = 3001
// This line sets a variable named port to the value 3001, which is the port number where the server will listen for incoming requests.
// ------------------------------------------------------
// 
// app.get('/', (req, res) => {
//   res.send('Hello hello World!')
// })
// This code sets up a route for HTTP GET requests to the root URL '/'. When a GET request is made to the root URL, the server responds by sending the string 'Hello hello World!' back to the client.
// ------------------------------------------------------
// 
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
// This line starts the Express server to listen on the specified port (in this case, 3001). When the server starts listening on this port, it logs a message to the console indicating that the server is running and listening for incoming connections on that specific port.
// Overall, this code snippet imports a function from a module that presumably establishes a connection to a MongoDB database, sets up an Express server, defines a route for the root URL to respond with a simple message, and starts the server to listen on port 3001.