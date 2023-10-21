// // authRoutes.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const db = require('../db'); // Database connection


// // User Registration
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Store user in the database
//     const insertUserQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id';
//     const role = "guest";
//     const insertUserValues = [name, email, password, role];

//     try {
//         const userInsertResult = await db.query(insertUserQuery, insertUserValues);
//         const userId = userInsertResult.rows[0].id;

//         // Log the login time in the database
//         const loginTimeQuery = 'INSERT INTO logs (user_id) VALUES ($1) RETURNING id';
//         const loginTimeValues = [userId];

//         const loginResult = await db.query(loginTimeQuery, loginTimeValues);
//         const loginLogId = loginResult.rows[0].id;

//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while registering the user');
//     }
// });

// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Authenticate the user as shown in the previous example
//     const query = 'SELECT * FROM users WHERE email = $1';
//     const values = [email];

//     try {
//         const result = await db.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(401).send('Invalid email or password');
//         }

//         const user = result.rows[0];

//         // Compare hashed password
//         // const passwordMatch = await bcrypt.compare(password, user.password);
//         const passwordMatch = password === user.password
//         if (passwordMatch) {
//             // Return a JWT token for authentication
//             // Include other user data if needed
//             const loginTimeQuery = 'INSERT INTO logs (user_id) VALUES ($1)';
//             const loginTimeValues = [user.id]; // You should have the user's ID after authentication
//             try {
//                 const { rows } = await db.query(loginTimeQuery, loginTimeValues);
//                 // const loginLogId = rows[0].id;

//                 // Return a JWT token or other response to the client, including the login log ID
//                 res.status(200).json({ userId: user.id, name: user.name, email: user.email });
//             } catch (error) {
//                 console.error('Error logging login time:', error);
//                 // Handle the error
//             }
//             res.status(200).json({ userId: user.id, name: user.name, email: user.email });
//         } else {
//             res.status(401).send('Invalid email or password');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred during login');
//     }
// });


// // User Logout
// router.post('/logout', async (req, res) => {
//     const { userId, loginLogId } = req.body;

//     // Update the logout time in the database
//     const logoutTimeQuery = 'UPDATE logs SET logout_time = NOW() WHERE id = $1';
//     const logoutTimeValues = [loginLogId];

//     try {
//         await db.query(logoutTimeQuery, logoutTimeValues);

//         // Handle the logout and send a response to the client
//         res.status(200).send('User logged out successfully');
//     } catch (error) {
//         console.error('Error logging logout time:', error);
//         // Handle the error
//     }
// });

// module.exports = router;