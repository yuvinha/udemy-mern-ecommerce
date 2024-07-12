import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const importData = async () => {
  try {
    // Delete any existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // Insert user data
    const createdUsers = await User.insertMany(users);
    // Identify admin user
    const adminUser = createdUsers.find((user) => user.isAdmin === true);
    // Assign admin user to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    // Insert product data
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
