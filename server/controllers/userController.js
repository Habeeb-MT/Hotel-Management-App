import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// fetch users
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


// fetch user
export const fetchUserController = async (req, res) => {
    const { id } = req.query; // Retrieve 'id' from query parameters
    try {
        const get = await client.query('SELECT id, name, email, phone, state, city, pin FROM users WHERE id = $1', [id]);
        const user = get.rows[0]; // Assuming you want a single user object

        res.json({
            success: true,
            message: 'User details fetched successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred in user fetching',
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


// update user 
export const updateUserController = async (req, res) => {
    const { id, name, phone, state, city, pin } = req.body;
    const { updatedUser } = req.body;
    console.log(updatedUser)
    try {
        const update = await client.query('UPDATE users set name = $1, phone = $2, state = $3, city = $4, pin = $5 WHERE id = $6', [updatedUser.name, updatedUser.phone, updatedUser.state, updatedUser.city, updatedUser.pin, updatedUser.id]);
        const user = update.rows[0];

        // Once the user is updated, send a success response
        res.json({
            success: true,
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        // If an error occurs during the update, send an error response
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message,
        });
    }
};





// fetch report
export const fetchReportController = async (req, res) => {
    try {
        const get = await client.query('SELECT * FROM invoice, reserve WHERE invoiceid = reserveid');
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
