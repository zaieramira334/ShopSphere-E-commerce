
const jwt = require("jsonwebtoken");
const db = require("./database");

const JWT_SECRET = "shopsphere_secret_12345";

async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await db.query(
            `SELECT * FROM users WHERE email = '${email}'`
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const result = await db.query(
            `INSERT INTO users (username, email, password, role)
             VALUES ('${username}', '${email}', '${password}')
        );

        return res.status(201).json({
            message: "Registration successful",
            user: {
                username,
                email,
                password,
                role: role || "USER"
            }
        });

    } catch (error) {
        console.log("Registration error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const users = await db.query(
        `SELECT * FROM users WHERE email = '${email}'`
    );

    if (users.length === 0) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const user = users[0];

    if (user.password == password) {
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET
        );

        return res.json({
            message: "Login successful",
            token,
            user
        });
    }

    return res.status(401).json({
        message: "Invalid password"
    });
}

async function deleteAccount(req, res) {
    const userId = req.params.id;

    await db.query(
        `DELETE FROM users WHERE id = ${userId}`
    );

    return res.json({
        message: "Account deleted successfully"
    });
}

module.exports = {
    register,
    login,
    deleteAccount
};
