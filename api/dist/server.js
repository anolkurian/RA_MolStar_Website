"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mssql_1 = require("mssql");
const app = (0, express_1.default)();
const PORT = 5000; // Set your desired port number
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// SQL Server configuration
const dbConfig = {
    options: {
        trustedConnection: true,
    },
    server: 'Popos',
    database: 'MolstarWeb',
};
// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Store the user in the database
        const pool = new mssql_1.ConnectionPool(dbConfig);
        await pool.connect();
        const query = `INSERT INTO Users (Username, Password) VALUES ('${username}', '${hashedPassword}')`;
        await pool.request().query(query);
        await pool.close();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
});
// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Retrieve the user from the database
        const pool = new mssql_1.ConnectionPool(dbConfig);
        await pool.connect();
        const query = `SELECT * FROM Users WHERE Username = '${username}'`;
        const result = await pool.request().query(query);
        const user = result.recordset[0];
        await pool.close();
        if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        // Compare the password
        const passwordMatch = await bcryptjs_1.default.compare(password, user.Password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ username: user.Username }, 'your_secret_key');
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// npx ts-node src/server.ts
