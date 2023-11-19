import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// create service
export const createServiceController = async (req, res) => {
    try {
        const { charge, serviceType, guestId } = req.body;
        const status = "Pending";

        const insertQuery = 'INSERT INTO service (charge, serviceType, guestId, status) VALUES ($1, $2, $3, $4) RETURNING serviceId';
        const values = [charge, serviceType, guestId, status];
        const { rows } = await client.query(insertQuery, values);
        const newServiceId = rows[0].id;

        return res.status(201).send({
            success: true,
            message: 'Service requested successfully',
            serviceId: newServiceId,
        });
    } catch (error) {
        console.error("Error creating service:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while creating service',
            error: error.message,
        });
    }
};





// fetch service
export const fetchServiceController = async (req, res) => {
    try {
        const status = "Pending"
        const serviceType = req.params.serviceType; // Extract serviceType from query params
        const get = await client.query('SELECT * FROM service WHERE serviceType = $1 and status = $2', [serviceType, status]);
        const services = get.rows;

        res.json({
            success: true,
            message: 'Services fetched successfully',
            services,
        });

    } catch (error) {
        console.log(error);

        // Send an error response if there's an issue
        res.status(500).json({
            success: false,
            message: 'Error occurred in service fetching',
            error: error.message,
        });
    }
};


// accept booking service
export const acceptServiceController = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const stat = "Booked"
        const updateQuery = 'UPDATE service SET status = $1 WHERE serviceid = $2 RETURNING serviceId';
        const values = [stat, serviceId];
        const { rows } = await client.query(updateQuery, values);
        const newServiceId = rows[0].id;

        return res.status(201).send({
            success: true,
            message: 'Booking confirmed successfully',
            serviceId: newServiceId,
        });
    } catch (error) {
        console.error("Error confirming booking:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while confirming booking',
            error: error.message,
        });
    }
};