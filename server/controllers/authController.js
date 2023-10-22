import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import client from '../config/db.js';
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    //check user
    const check = 'SELECT * FROM users WHERE email = $1';
    const Email = email;
    const res1 = await client.query(check, [email]);
    if (res1.rows.length > 0) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);

    const checki = 'INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, $4) RETURNING id';
    const role = 'guest';
    const value = [name, email, hashedPassword, role];
    const resi = await client.query(checki, value);


    //  if (user) {
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      resi,
    });
    //  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//post login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const check = 'SELECT * FROM users WHERE email = $1';
    const Email = email;
    const user = await client.query(check, [email]);

    if (user.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Email not registerd",
      });
    }
    const userData = user.rows[0];
    const match = await comparePassword(password, userData.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await JWT.sign({ id: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      userData: {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};