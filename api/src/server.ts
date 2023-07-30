import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConnectionPool, config } from 'mssql';

const app = express();
const PORT = 5000; // Set your desired port number

// Middleware
app.use(bodyParser.json());
app.use(cors());

const sql = require("mssql/msnodesqlv8");
const dbConfig: config = {
  options: {
    // encrypt: true,  // Enable encryption for secure connection
    // trustServerCertificate: true,  // Trust the self-signed certificate
    trustedConnection: true,
  },
  server: 'POPOS',
  database: 'MolstarWeb',
  // driver: 'msnodesqlv8',
};
const dbConfig2 = {
  connectionTimeout : 30000,
  connectionString: 'Driver={SQL Server Native Client 11.0};Server=POPOS;Database=MolstarWeb;Trusted_Connection=yes;',
  options: {
      
  }
};


// User login endpoint
app.post('/login', async (req: Request, res: Response) => {
  try {
    console.log('start');
    const { username, password } = req.body;
    await sql.connect(dbConfig);

    console.log('Here');
    const query = `SELECT * FROM Users WHERE Username = '${username}'`;
    const result = await sql.query(query);
    const user = result.recordset[0];
    console.log('end');
    // await pool.close();

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.Username }, 'your_secret_key');

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});




// User registration endpoint
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = new sql.ConnectionPool(dbConfig)
    console.log("Here");
    // Store the user in the database
    // const pool = new ConnectionPool(dbConfig);
    await pool.connect();
    const query = `INSERT INTO Users (Username, Password) VALUES ('${username}', '${hashedPassword}')`;
    await pool.request().query(query);
    await pool.close();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// npx ts-node src/server.ts