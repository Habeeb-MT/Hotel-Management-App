import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();

// Fetch all rooms
export const getUserCount = async (req, res) => {
    try {
        const users = await client.one('SELECT COUNT(*) FROM users');

        res.status(200).json({
            success: true,
            users: users.count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching rooms',
            error: error.message || error,
        });
    }
};

// Fetch room count
export const getRoomCount = async (req, res) => {
    try {
        const count = await client.one('SELECT COUNT(*) FROM rooms'); // Assuming your table name is 'rooms'

        res.status(200).json({
            success: true,
            count: count.count,
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
