const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

const PORT = config.port;
connectDB(); 

// Middleware   
app.use(cors({
    credentials: true, // Allow cookies to be sent
    origin: ['http://localhost:5173']
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Root Endpoint
app.get("/", (req, res) => {
    res.json({message: "Hello from POS Server!"});
});

// Other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

// Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
    console.log(`POS Server is running on http://localhost:${PORT}`);
});