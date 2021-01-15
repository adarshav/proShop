// Basically the seeder file is import the data to mongoDB (not from postman) and also to destroy 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import users from './data/users.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // first delete all data, if present in collections
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();
    
    //    importing users 
       const createdUsers = await User.insertMany(users);

        // taking out adminUser
       const adminUser = createdUsers[0]._id;

        // mapping every single product to adminUser
       const sampleProducts = products.map(product => {
           return { ...product, user: adminUser }
       })

    //    importing Products
       await Product.insertMany(sampleProducts);

       console.log('Data imported!.'.green.inverse);
       process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse)
        process.exit(1);//1 means stop execution
    }
}

const destroyData = async () => {
    try {
        // deleting all data in collections
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();
    
       console.log('Data Destroyed!.'.red.inverse);
       process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse)
        process.exit(1);//1 means stop execution
    }
}
// this is for the execution. While executing this is the command to import = node backend/seeder. for Destroy = node backend/seeder -d. For this we have passed the arguments check in if condition.
// Now we want to get rid by executing like this we will be changing in package.json file 
if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}