
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

    if (selectedOccupancy.length > 0) {
      conditions.push(`selected_occupancy = $${index}`);
      values.push(selectedOccupancy);
      index++;
    }

    if (selectedSuiteType.length > 0) {
      conditions.push(`selected_suite_type = $${index}`);
      values.push(selectedSuiteType);
      index++;
    }

    if (ac.length > 0) {
      conditions.push(`ac = $${index}`);
      values.push(ac);
      index++;
    }

    if (selectedAvai.length > 0) {
      conditions.push(`selected_avai = $${index}`);
      values.push(selectedAvai);
      index++;
    }

    if (selectedRate.length) {
      conditions.push(`rate_column BETWEEN $${index} AND $${index + 1}`);
      values.push(selectedRate[0], selectedRate[1]);
      index += 2;
    }

    const query = {
      text: `
        SELECT *
        FROM room
        WHERE ${conditions.join(' AND ')}
      `,
      values,
    };
    const result = await client.query(query);
    const products = result.rows;

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error while searching rooms",
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