const { OAuth2Client } = require("google-auth-library");
const db = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const clientId = "908954668020-6ng0d40usd40g28594jtcuu8gguois4r.apps.googleusercontent.com"

const client = new OAuth2Client(clientId);


const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "1h" }
    );
};



const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "Google token is required" });
        }

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ error: "Database error", details: error });
            }

            let user;
            if (results.length > 0) {
                user = results[0]; // Existing user
                return res.json({
                    message: "Google login successful",
                    token: generateToken(user),
                    user: { id: user.id, name: user.name, email: user.email },
                });
            }

            // Register new user
            const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(insertSql, [name, email, googleId], (insertError, insertResults) => {
                if (insertError) {
                    console.error("Database error:", insertError);
                    return res.status(500).json({ error: "Database error", details: insertError });
                }

                user = { id: insertResults.insertId, email, name };

                return res.json({
                    message: "User registered via Google",
                    token: generateToken(user),
                    user: { id: user.id, name: user.name, email: user.email },
                });
            });
        });

    } catch (error) {
        console.error("Google authentication error:", error);
        res.status(500).json({ error: "Google login failed", details: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ error: "Database error", details: error });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" ,details:error});
            }

            const user = results[0];
            console.log("User data:", user); // Log user data

            if (!user.PASSWORD) {
                return res.status(500).json({ error: "Password not found for user" });
            }

            console.log("Comparing password:", password, "with hashed password:", user.PASSWORD); // Log password comparison

            const isMatch = await bcrypt.compare(password, user.PASSWORD);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                }
            });
        });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
};



const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }

    try {
        // Check if the email already exists in the database
        const sqlCheckEmail = "SELECT * FROM users WHERE email = ?";
        db.query(sqlCheckEmail, [email], async (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ error: "Database error", details: error });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Email already in use" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

            // Insert the new user into the database
            const sqlInsertUser = "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)";
            db.query(sqlInsertUser, [name, email, hashedPassword, isAdmin || false], (error, results) => {
                if (error) {
                    console.error("Database error:", error);
                    return res.status(500).json({ error: "Database error", details: error });
                }

                // Optionally, you can generate a token for the newly registered user
                const token = jwt.sign(
                    { id: results.insertId, email, isAdmin: isAdmin || false },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.json({
                    message: "User registered successfully",
                    token,
                    user: {
                        id: results.insertId,
                        name,
                        email,
                        isAdmin: isAdmin || false,
                    }
                });
            });
        });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
};
{/* 
// Email transporter for sending reset emails
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ===== FORGOT PASSWORD (Send Reset Email) =====
const forgotPassword = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        
        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).json({ error: "Email sending failed" });
            }
            res.json({ message: "Password reset link sent to email" });
        });
    });
};

// ===== RESET PASSWORD (After Clicking Reset Link) =====
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const sql = "UPDATE users SET password = ? WHERE id = ?";

        db.query(sql, [hashedPassword, userId], (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Password reset successfully" });
        });
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }
};

// ===== CHANGE PASSWORD (Logged-in User) =====
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Old and new password are required" });
    }

    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], async (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = "UPDATE users SET password = ? WHERE id = ?";

        db.query(updateSql, [hashedPassword, userId], (updateError) => {
            if (updateError) {
                console.error("Database error:", updateError);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Password changed successfully" });
        });
    });
};

module.exports = {
    googleLogin,
    loginUser,
    registerUser,
    forgotPassword,
    resetPassword,
    changePassword
};
*/}
module.exports = { registerUser,loginUser,googleLogin  };
