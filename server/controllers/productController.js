import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();




//filters

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile searching rooms",
      error,
    });
  }
};



//search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const query = `SELECT * FROM product WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1;  `;

    const result = await client.query(query, [`%${keyword.toLowerCase()}%`]);

    // Exclude the 'photo' column from the result
    const results = result.rows.map(row => {
      const { photo, ...productDataWithoutPhoto } = row;
      return productDataWithoutPhoto;
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};


// create product
export const createProductController = async (req, res) => {
  try {
    const { type, cap, num, price, descript, pic } = req.body;

    const ins = 'INSERT INTO rooms (rnumber, rtype, rate, occupancy, description, pic, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING rnumber';
    const values = [num, type, price, cap, descript, pic, "Available"];

    const insert = await client.query(ins, values);

    return res.status(201).send({
      success: true,
      message: 'Room added successfully',
      insert,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error occurred in room adding',
      error,
    });
  }
};



// fetch product
export const fetchProductController = async (req, res) => {
  try {
    const get = await client.query('SELECT * FROM rooms');
    const rooms = get.rows;
    // const rooms = get.rows.map(room => {
    //   // Assuming that the image is stored in a column named 'pic' of type bytea
    //   // Convert the bytea data to a base64-encoded string
    //   const base64Image = room.pic.toString('base64');

    //   return {
    //     ...room,
    //     pic: base64Image,
    //   };
    // });

    // Send the rooms as JSON response
    res.json({
      success: true,
      message: 'Rooms fetched successfully',
      rooms,
    });

  } catch (error) {
    console.log(error);

    // Send an error response if there's an issue
    res.status(500).json({
      success: false,
      message: 'Error occurred in room fetching',
      error: error.message,
    });
  }
};



// delete product
export const deleteProductController = async (req, res) => {
  try {
    const { rnumber } = req.params;

    const del = 'DELETE FROM rooms WHERE rnumber = $1';

    const delroom = await client.query(del, [rnumber]);

    return res.status(201).send({
      success: true,
      message: 'Room deleted successfully',
      delroom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error occurred in room deletion',
      error,
    });
  }
};




// edit product
export const editProductController = async (req, res) => {
  try {
    const { rnumber } = req.params;
    const updateFields = req.body;

    // Generate the SET clause dynamically based on the fields in updateFields
    const setClause = Object.keys(updateFields).map((key, index) => {
      return `${key} = $${index + 1}`;
    }).join(', ');

    const query = `UPDATE rooms SET ${setClause} WHERE rnumber = $${Object.keys(updateFields).length + 1} RETURNING *`;

    const values = [...Object.values(updateFields), rnumber];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return res.status(200).send({
        success: true,
        message: 'Room updated successfully',
        updatedRoom: result.rows[0],
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'Room not found or not updated',
      });
    }
  } catch (error) {
    console.log('Error in editProductController:', error);
    res.status(500).send({
      success: false,
      message: 'Error occurred in room update',
      error: error.message,
    });
  }
};
