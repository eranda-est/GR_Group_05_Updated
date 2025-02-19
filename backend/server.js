require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");

const userRoutes = require("./Routes/UserRoutes.js");

const app = express();
const PORT = process.env.PORT || 7000; // Use the PORT from .env, fallback to 5000 if undefined

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

//User route
app.use('/api/user',userRoutes)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
