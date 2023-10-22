import JWT from "jsonwebtoken";
import client from '../config/db.js';

//protected route token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

// export const isAdmin = async (req, res, next) => {
//   try {

//     const check ='SELECT * FROM users WHERE id = $1';
//     const u=req.user._id; 
//     const user = await client.query(check,[u]);
//     const userData = user.rows[0];
//     if (userData.role !== 'admin') {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorised access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin Middleware",
//     });
//   }
// };
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = 'SELECT role FROM users WHERE id = $1';
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    const userRole = result.rows[0].role;

    if (userRole !== 'admin') {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin Middleware",
    });
  }
};
