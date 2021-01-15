// this file is for the configuration of database
import mongoose from 'mongoose';

// Why we are creating a aync function? == Because we will be making some operations regarding mongoDB such as find, save and those will return a promise (.then and .catch) so to avoid that we are using aync and await function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    // If error rises we have to exit the the execution with an error name
    process.exit(1);
  }
};

export default connectDB;
