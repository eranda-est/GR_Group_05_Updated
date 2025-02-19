
require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 7000; // Use the PORT from .env, fallback to 5000 if undefined

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});




// API Route to Store Code in Database
app.post("/api/enter-code", (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    const query = "INSERT INTO codes (code) VALUES (?)";

    db.query(query, [code], (err, result) => {
        if (err) {
            console.error("Error inserting code:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Code saved successfully", id: result.insertId });
    });
});






// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
