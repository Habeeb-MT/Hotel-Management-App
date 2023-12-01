import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// create Roomservice
export const createRoomServiceController = async (req, res) => {
    try {
        const { serviceType, guestId, rnumber, spInstruct } = req.body;
        const status = "Pending";

        const insertQuery = 'INSERT INTO service (serviceType, guestId, rnumber, status) VALUES ($1, $2, $3, $4) RETURNING serviceId';
        const values = [serviceType, guestId, rnumber, status];
        const ins = await client.query(insertQuery, values);
        const newServiceId = ins.rows[0].serviceid;

        return res.status(201).send({
            success: true,
            message: 'Room Service requested successfully',
            serviceId: newServiceId,
        });
    } catch (error) {
        console.error("Error creating room service:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while creating room service',
            error: error.message,
        });
    }
};



// fetch Room Admin service
export const fetchRoomServiceController = async (req, res) => {
    try {
        const status = "Pending"
        const serviceType = 'Booking';
        const get = await client.query('SELECT * FROM service WHERE serviceType != $1 and status = $2', [serviceType, status]);
        const services = get.rows;

        res.json({
            success: true,
            message: 'Room Services fetched successfully',
            services,
        });

    } catch (error) {
        console.log(error);

        // Send an error response if there's an issue
        res.status(500).json({
            success: false,
            message: 'Error occurred in room service fetching',
            error: error.message,
        });
    }
};


// accept room service
export const acceptRoomServiceController = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const stat = "Done"
        const updateQuery = 'UPDATE service SET status = $1 WHERE serviceid = $2 RETURNING serviceId';
        const values = [stat, serviceId];
        const { rows } = await client.query(updateQuery, values);
        const newServiceId = rows[0].id;

        return res.status(201).send({
            success: true,
            message: 'room service done successfully',
            serviceId: newServiceId,
        });
    } catch (error) {
        console.error("Error doing room booking:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while doing room service',
            error: error.message,
        });
    }
};


// fetch CheckedIn Rooms
export const fetchMyRequstedRoomServiceController = async (req, res) => {

    try {
        const guestId = req.query.guestId;
        let get = await client.query('SELECT * FROM service WHERE guestid = $1', [guestId]);
        const services = get.rows;

        res.json({
            success: true,
            message: 'room services fetched successfully',
            services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred in fetching requested room services',
            error: error.message,
        });
    }
};