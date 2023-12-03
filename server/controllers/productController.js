import dotenv from "dotenv"
import client from '../config/db.js';
dotenv.config();




//filters

// export const productFiltersController = async (req, res) => {
//   try {
//     const { selectedOccupancy, selectedSuiteType, selectedRate, startDate, endDate } = req.query;

//     let values = [];
//     let conditions = [];
//     let index = 1;
//     let values1 = [];
//     let conditions1 = [];
//     let index1 = 1;

//     if (selectedOccupancy && selectedOccupancy.length > 0) {
//       conditions.push(`occupancy = $${index}`);
//       values.push(selectedOccupancy[0]);
//       index++;
//     }

//     if (selectedSuiteType && selectedSuiteType.length > 0) {
//       conditions.push(`rtype = $${index}`);
//       values.push(selectedSuiteType[0]);
//       index++;
//     }

//     if (selectedRate && selectedRate.length === 2) {
//       conditions.push(`rate BETWEEN $${index} AND $${index + 1}`);
//       values.push(selectedRate[0], selectedRate[1]);
//       index += 2;
//     }

//     if (startDate && endDate) {
//       // conditions1.push(`(startdate NOT BETWEEN $${index1} AND $${index1 + 1} AND enddate NOT BETWEEN $${index1} AND $${index1 + 1})`);
//       conditions1.push(`(TO_DATE(reserve.startdate::TEXT, 'YYYY-MM-DD') NOT BETWEEN $${index} AND $${index + 1} AND TO_DATE(reserve.enddate::TEXT, 'YYYY-MM-DD') NOT BETWEEN $${index} AND $${index + 1})`);
//       values1.push(startDate, endDate);
//       index1 += 2;
//     }

//     console.log(conditions.join(' AND '))
//     console.log(conditions1.join(' AND '))

//     const result = await client.query(
//       `
//         SELECT *
//         FROM rooms
//         ${conditions.length > 0 ? ' WHERE ' : ''}
//         ${conditions.join(' AND ')}
//         AND NOT EXISTS (
//           SELECT *
//           FROM reserve
//           ${conditions1.length > 0 ? ' WHERE rooms.rnumber = reserve.rnumber AND ' : ''}
//           ${conditions1.join(' AND ')}
//         )
//       `,
//       [...values, ...values1]
//     );

//     // console.log('Generated SQL Query:', `
//     //   SELECT *
//     //   FROM rooms
//     //   ${conditions.length > 0 ? ' WHERE ' : ''}
//     //   ${conditions.join(' AND ')}
//     //   AND NOT EXISTS (
//     //     SELECT *
//     //     FROM reserve
//     //     ${conditions1.length > 0 ? ' WHERE rooms.rnumber = reserve.rnumber AND ' : ''}
//     //     ${conditions1.join(' AND ')}
//     //   )
//     // `);

//     // console.log('Query Values:', [...values, ...values1]);


//     const rooms = result.rows;

//     res.status(200).send({
//       success: true,
//       message: "Filter works successfully.",
//       rooms,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while searching rooms",
//       error: error.message || error,
//     });
//   }
// };

export const productFiltersController = async (req, res) => {
  try {
    const { selectedOccupancy, selectedSuiteType, selectedRate, startDate, endDate } = req.query;

    let values = [];
    let conditions = [];
    let index = 1;

    if (selectedOccupancy && selectedOccupancy.length > 0) {
      conditions.push(`occupancy = $${index}`);
      values.push(selectedOccupancy[0]);
      index++;
    }

    if (selectedSuiteType && selectedSuiteType.length > 0) {
      conditions.push(`rtype = $${index}`);
      values.push(selectedSuiteType[0]);
      index++;
    }

    if (selectedRate && selectedRate.length === 2) {
      conditions.push(`rate BETWEEN $${index} AND $${index + 1}`);
      values.push(selectedRate[0], selectedRate[1]);
      index += 2;
    }

    if (startDate && endDate) {
      conditions.push(`(startdate NOT BETWEEN $${index} AND $${index + 1} AND enddate NOT BETWEEN $${index} AND $${index + 1})`);
      values.push(startDate, endDate);
      index += 2;
    }
    const result = await client.query(
      `
        SELECT *
        FROM rooms
        LEFT JOIN reserve ON rooms.rnumber = reserve.rnumber
        ${conditions.length > 0 ? ' WHERE ' : ''} ${conditions.join(' AND ')}
        AND (
          reserve.rnumber IS NULL OR
          (reserve.rnumber IS NOT NULL AND (reserve.enddate < $${index} OR reserve.startdate > $${index + 1}))
        )
      `,
      [...values, startDate, endDate]
    );

    console.log('Generated SQL Query:', `
    SELECT *
    FROM rooms
    ${conditions.length > 0 ? ' WHERE ' : ''} ${conditions.join(' AND ')}
  `);

    console.log('Query Values:', values);

    const rooms = result.rows;

    res.status(200).send({
      success: true,
      message: "Filter works successfully.",
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
    const { type, cap, num, price, descript, pic } = req.body;

    const ins = 'INSERT INTO rooms (rnumber, rtype, rate, occupancy, description, pic) VALUES ($1, $2, $3, $4, $5, $6) returning *';
    const values = [num, type, price, cap, descript, pic];

    const insert = await client.query(ins, values);
    const room = insert.rows[0];
    return res.status(201).send({
      success: true,
      message: 'Room added successfully',
      room,
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
        room: result.rows[0],
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





// create service
export const makeServiceController = async (req, res) => {
  try {
    const { charge, guestId, rnumber, startDate, endDate } = req.body;
    const status = "Pending";

    const insertQuery = 'INSERT INTO reserve (charge, guestId, status, rnumber, startDate, endDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING reserveId';
    const values = [charge, guestId, status, rnumber, startDate, endDate];
    const ins = await client.query(insertQuery, values);
    const newServiceId = ins.rows[0].reserveid;

    return res.status(201).send({
      success: true,
      message: 'reservation requested successfully',
      reserveid: newServiceId,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);

    return res.status(500).send({
      success: false,
      message: 'Error occurred while creating reservation',
      error: error.message,
    });
  }
};








// add guest
export const addGuestController = async (req, res) => {
  try {
    const { guestId, reserveId, guestList } = req.body;

    const insertPromises = guestList.map(async (guest) => {
      const ins = 'INSERT INTO occupants (serviceId, guestId, oName) VALUES ($1, $2, $3)';
      const values = [reserveId, guestId, guest.name];

      return await client.query(ins, values);
    });

    await Promise.all(insertPromises);

    return res.status(201).send({
      success: true,
      message: 'Guests added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error occurred in guest adding',
      error,
    });
  }
};




// fetch Admin service
export const fetchReserveController = async (req, res) => {
  try {
    const status = "Pending"
    const get = await client.query('SELECT * FROM reserve WHERE status = $1', [status]);
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
export const acceptReserveController = async (req, res) => {
  try {
    const { reserveId } = req.body;
    const stat = "Booked"
    const updateQuery = 'UPDATE reserve SET status = $1 WHERE reserveid = $2 RETURNING reserveid';
    const values = [stat, reserveId];
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
export const fetchMyBookingController = async (req, res) => {

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
    const status = getServiceStatus(serviceType);
    const guestId = req.query.guestId; // Retrieve guestId from query parameters

    let get;
    if (status === "Booked")
      get = await client.query('SELECT * FROM reserve WHERE guestid = $1 AND (status = $2 OR status = $3)', [guestId, status, 'CheckedIn']);
    else
      get = await client.query('SELECT * FROM reserve WHERE guestid = $1 AND status = $2', [guestId, status]);
    const services = get.rows;

    res.json({
      success: true,
      message: 'Booked Rooms fetched successfully',
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred in my rooms fetching',
      error: error.message,
    });
  }
};

// cancel booking
export const cancelMyBookingController = async (req, res) => {
  try {
    const { reserveId } = req.body;
    const status = "Cancelled";

    const updateQuery = 'UPDATE reserve SET status = $1 WHERE reserveid = $2 RETURNING reserveid';
    const values = [status, reserveId];
    const { rows } = await client.query(updateQuery, values);
    const updatedServiceId = rows[0].reserveId;

    return res.status(200).send({
      success: true,
      message: 'Booking cancelled successfully',
      reserveId: updatedServiceId,
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
    const { reserveId } = req.body;
    const status = "CheckedIn";

    const updateQuery = 'UPDATE reserve SET status = $1 WHERE reserveid = $2 RETURNING reserveId';
    const values = [status, reserveId];
    const { rows } = await client.query(updateQuery, values);
    const updatedreserveId = rows[0].reserveId;

    return res.status(200).send({
      success: true,
      message: 'Room checked-in successfully',
      reserveId: updatedreserveId,
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
    const { reserveId } = req.body;
    const status = "Completed";

    const updateQuery = 'UPDATE reserve SET status = $1 WHERE reserveid = $2 RETURNING reserveid';
    const values = [status, reserveId];
    const { rows } = await client.query(updateQuery, values);
    const updatedreserveId = rows[0].reserveid;

    return res.status(200).send({
      success: true,
      message: 'Room checked-out successfully',
      reserveId: updatedreserveId,
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


// fetch CheckedIn Rooms
export const fetchMyCheckedInServiceController = async (req, res) => {

  try {
    const guestId = req.query.guestId;
    let get = await client.query('SELECT rnumber FROM reserve WHERE guestid = $1 AND status = $2', [guestId, 'CheckedIn']);
    const services = get.rows;

    res.json({
      success: true,
      message: 'Checkedin rooms fetched successfully',
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred in service Checkedin rooms',
      error: error.message,
    });
  }
};

