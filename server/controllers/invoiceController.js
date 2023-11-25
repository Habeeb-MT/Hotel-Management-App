import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();



// create invoice
export const createInvoiceController = async (req, res) => {
    try {
        const { serviceId, paymentInfo, room, date } = req.body;
        const pMethod = paymentInfo.cardNumber ? "Debit/Credit-Card" : "UPI-Payment";
        console.log(paymentInfo, room, pMethod, date)

        const insertQuery = 'INSERT INTO invoice (invoiceid, date, guestId, amount, pMethod, cardNumber, upiID, bAdress) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING invoiceId';
        const values = [serviceId, date, room.guestid, room.rate, pMethod, paymentInfo.cardNumber, paymentInfo.upiId, paymentInfo.billingAddress];
        const result = await client.query(insertQuery, values);
        const newInvoiceId = result.rows[0].invoiceid;

        return res.status(201).send({
            success: true,
            message: 'Invoice created successfully',
            invoiceID: newInvoiceId,
        });
    } catch (error) {
        console.error("Error creating invoice:", error);

        return res.status(500).send({
            success: false,
            message: 'Error occurred while creating invoice',
            error: error.message,
        });
    }
};


// fetch invoice
export const fetchInvoiceController = async (req, res) => {

    try {
        const { invoiceID } = req.params;
        const get = await client.query('SELECT * FROM invoice WHERE invoiceId = $1', [invoiceID]);
        const invoice = get.rows[0];

        res.json({
            success: true,
            message: 'invoice fetched successfully',
            invoice,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred in invoice fetching',
            error: error.message,
        });
    }
};
