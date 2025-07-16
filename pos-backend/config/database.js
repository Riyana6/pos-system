const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        console.log('Mongo URI:', process.env.MONGODB_URI);
        const conn = await mongoose.connect(config.databaseURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(); // Exit process with failure
    }
}

module.exports = connectDB;