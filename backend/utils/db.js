const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "eranda",
    password: "Eranda1289#",
    database: "gamage_recruiters_DB",
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error("Database Connection Failed:", err);
        process.exit(1);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

module.exports = db; // Use CommonJS export
