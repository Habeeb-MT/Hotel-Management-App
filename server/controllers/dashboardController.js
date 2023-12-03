import dotenv from "dotenv";
import client from '../config/db.js';
dotenv.config();

// Fetch all rooms
// Fetch room count
export const getUserCount = async (req, res) => {
    try {
        const countResult = await client.query('SELECT COUNT(*) FROM users');
        const count = countResult.rows[0].count;

        res.status(200).json({
            success: true,
            count: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching room count',
            error: error.message || error,
        });
    }
};



// Fetch room count
// Fetch room count
export const getRoomCount = async (req, res) => {
    try {
        const countResult = await client.query('SELECT COUNT(*) FROM rooms');
        const count = countResult.rows[0].count;

        res.status(200).json({
            success: true,
            count: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching room count',
            error: error.message || error,
        });
    }
};

export const getOccupiedCount = async (req, res) => {
    try {
        const countResult = await client.query('SELECT COUNT(*) FROM reserve WHERE status = \'CheckedIn\'');
        const count = countResult.rows[0].count;

        res.status(200).json({
            success: true,
            count: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching occupied room count',
            error: error.message || error,
        });
    }
};

export const getRequestCount = async (req, res) => {
    try {
        const countResult = await client.query('SELECT COUNT(*) FROM reserve WHERE status = \'Pending\'');
        const count1 = countResult.rows[0].count;
        const countResult1 = await client.query('SELECT COUNT(*) FROM service WHERE status = \'Pending\'');
        const count2 = countResult1.rows[0].count;
        const count = parseInt(count1) + parseInt(count2);
        // Print count to the terminal
        console.log(count1)
        console.log(count2)
        res.status(200).json({
            success: true,
            count: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching occupied room count',
            error: error.message || error,
        });
    }
};
