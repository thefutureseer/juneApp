const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, { 
      useNewUrlParser: true,
      useCreateIndex: true,
      //determines whether or not to use MongoDB's findOneAndUpdate() instead of the deprecated findAndModify
      useFindAndModify: false,
      // using the new Server Discover and Monitoring engine   
      useUnifiedTopology: true, 
 
    });
    console.log('mongodb connect.')
  } catch(err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;