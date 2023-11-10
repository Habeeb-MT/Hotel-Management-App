import fs from "fs";
import slugify from "slugify";
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