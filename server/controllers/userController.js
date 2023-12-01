import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// fetch guestList
export const fetchGuestController = async (req, res) => {
    try {
        const get = await client.query('SELECT id, name, email, rnumber FROM users, reserve WHERE id = guestId AND role = $1 AND status = $2', ["guest", "CheckedIn"]);
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


// fetch guestList
export const fetchOccupantController = async (req, res) => {
    const { guestId } = req.query; // Use req.query.guestId to access query parameters
    try {
        const get = await client.query('SELECT oname FROM occupants WHERE guestid = $1', [guestId]);
        const occupants = get.rows.map((row) => row.oname); // Extracting 'oname' from the rows

        res.json({
            success: true,
            message: 'Occupants fetched successfully',
            guestId,
            occupants,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error occurred in occupants fetching',
            error: error.message,
        });
    }
};
