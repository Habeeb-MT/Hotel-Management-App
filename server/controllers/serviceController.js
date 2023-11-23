import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// create service
export const createServiceController = async (req, res) => {
    try {
        const { charge, serviceType, guestId, roomid, startDate, endDate } = req.body;
        const status = "Pending";

        const insertQuery = 'INSERT INTO service (charge, serviceType, guestId, status, roomID, startDate, endDate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING serviceId';
        const values = [charge, serviceType, guestId, status, roomid, startDate, endDate];
        const ins = await client.query(insertQuery, values);
        const newServiceId = ins.rows[0].serviceid;

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





// fetch Admin service
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



// fetch My service
export const fetchMyServiceController = async (req, res) => {

    // Function to convert serviceType to status
    const getServiceStatus = (serviceType) => {
        switch (serviceType) {
            case 'booked':
                return 'Booked';
            case 'completed':
                return 'Completed';
            case 'cancelled':
                return 'Cancelled';
            default:
                return ''; // Handle invalid types here
        }
    };

    try {
        const { serviceType } = req.params;
        const status = getServiceStatus(serviceType); // Convert serviceType to status (e.g., 'Booked' for 'booked')

        let get;
        if (status === "Booked")
            get = await client.query('SELECT * FROM service WHERE status = $1 OR status = $2', [status, 'CheckedIn']);
        else
            get = await client.query('SELECT * FROM service WHERE status = $1', [status]);
        const services = get.rows;

        res.json({
            success: true,
            message: 'Services fetched successfully',
            services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred in service fetching',
            error: error.message,
        });
    }
};

// cancel booking
export const cancelServiceController = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const status = "Cancelled";

        const updateQuery = 'UPDATE service SET status = $1 WHERE serviceid = $2 RETURNING serviceId';
        const values = [status, serviceId];
        const { rows } = await client.query(updateQuery, values);
        const updatedServiceId = rows[0].serviceId;

        return res.status(200).send({
            success: true,
            message: 'Booking cancelled successfully',
            serviceId: updatedServiceId,
        });
    } catch (error) {
        console.error("Error cancelling booking:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while cancelling booking',
            error: error.message,
        });
    }
};

// check-in room 
export const checkInServiceController = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const status = "CheckedIn";

        const updateQuery = 'UPDATE service SET status = $1 WHERE serviceid = $2 RETURNING serviceId';
        const values = [status, serviceId];
        const { rows } = await client.query(updateQuery, values);
        const updatedServiceId = rows[0].serviceId;

        return res.status(200).send({
            success: true,
            message: 'Room checked-in successfully',
            serviceId: updatedServiceId,
        });
    } catch (error) {
        console.error("Error check-in room: ", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while check-in',
            error: error.message,
        });
    }
};

// check-out room 
export const checkOutServiceController = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const status = "Completed";

        const updateQuery = 'UPDATE service SET status = $1 WHERE serviceid = $2 RETURNING serviceId';
        const values = [status, serviceId];
        const { rows } = await client.query(updateQuery, values);
        const updatedServiceId = rows[0].serviceId;

        return res.status(200).send({
            success: true,
            message: 'Room checked-out successfully',
            serviceId: updatedServiceId,
        });
    } catch (error) {
        console.error("Error check-out room: ", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while check-out',
            error: error.message,
        });
    }
};