import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// fetch guestList
export const fetchGuestController = async (req, res) => {
    try {
        const get = await client.query('SELECT * FROM users WHERE role = $1', ["guest"]);
        const guests = get.rows;

        // Send the rooms as JSON response
        res.json({
            success: true,
            message: 'guestList fetched successfully',
            guests,
        });

    } catch (error) {
        console.log(error);

        // Send an error response if there's an issue
        res.status(500).json({
            success: false,
            message: 'Error occurred in guestList fetching',
            error: error.message,
        });
    }
};
// fetch report
export const fetchReportController = async (req, res) => {
    try {
        const get = await client.query('SELECT * FROM invoice');
        const report = get.rows;

        // Send the rooms as JSON response
        res.json({
            success: true,
            message: 'report fetched successfully',
            report,
        });

    } catch (error) {
        console.log(error);

        // Send an error response if there's an issue
        res.status(500).json({
            success: false,
            message: 'Error occurred in report fetching',
            error: error.message,
        });
    }
};