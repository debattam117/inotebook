const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017"


const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  module.exports=connectToMongo;



















//-------------------------------------------------------------------------Comment Section------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const connectToMongo = () =>{                       this methnod is not accepting a call back now 
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected successfully")
//     })
// }

// module.exports = connectToMongo;



// const mongoURI="mongodb://127.0.0.1:27017/"
// You can connect to MongoDB with the mongoose.connect() method.
// mongoose.connect('mongodb://127.0.0.1:27017/myapp');
// This is the minimum needed to connect the myapp database running locally on the default port (27017). 
// For local MongoDB databases, we recommend using 127.0.0.1 instead of localhost. 
// That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines, Node.js will resolve localhost to the IPv6 address ::1 
// and Mongoose will be unable to connect, unless the mongodb instance is running with ipv6 enabled.

// You can also specify several more parameters in the uri:

// mongoose.connect('mongodb://username:password@host:port/database?options...');