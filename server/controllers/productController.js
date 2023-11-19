import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();




//filters

export const productFiltersController = async (req, res) => {
  try {
    const { selectedOccupancy, selectedSuiteType, ac, selectedAvai, selectedRate } = req.body;

    let values = [];
    let conditions = [];
    let index = 1;

    if (selectedOccupancy && selectedOccupancy.length > 0) {
      conditions.push(`occupancy = $${index}`);
      values.push(selectedOccupancy);
      index++;
    }

    if (selectedSuiteType && selectedSuiteType.length > 0) {
      conditions.push(`rtype = $${index}`);
      values.push(selectedSuiteType);
      index++;
    }

    if (ac && ac.length > 0) {
      conditions.push(`ac = $${index}`);
      values.push(ac);
      index++;
    }

    if (selectedAvai && selectedAvai.length > 0) {
      conditions.push(`availability = $${index}`);
      values.push(selectedAvai);
      index++;
    }

    if (selectedRate && selectedRate.length === 2) {
      conditions.push(`rate BETWEEN $${index} AND $${index + 1}`);
      values.push(selectedRate[0], selectedRate[1]);
      index += 2;
    }

    const query = {
      text: `
        SELECT *
        FROM rooms
        ${conditions.length > 0 ? 'WHERE' : ''} ${conditions.join(' AND ')}
      `,
      values,
    };

    const result = await client.query(query);
    const rooms = result.rows;

    res.status(200).send({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while searching rooms",
      error: error.message || error,
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
    const { name, type, cap, num, ac, price, desc, pic } = req.body;
    console.log(type, cap, num, price);

    // Convert the image data to a Buffer
    const picBuffer = Buffer.from(pic, 'base64');

    console.log('Received pic:', pic);
    console.log('Decoded picBuffer:', picBuffer);


    const ins = 'INSERT INTO rooms (rnumber, rtype, rate, occupancy, pic) VALUES ($1, $2, $3, $4, $5) RETURNING rnumber';
    const values = [num, type, price, cap, picBuffer];

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
