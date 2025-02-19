require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const userRoutes = require("./Routes/UserRoutes")

const app = express();
const PORT = process.env.PORT || 7000; // Use the PORT from .env, fallback to 5000 if undefined

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use("/api/users",userRoutes);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
