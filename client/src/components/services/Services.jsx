import React, { useEffect } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import "../home/featured/Featured.css";
import FeaturedCard from "../home/featured/FeaturedCard";
import { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Heading from "../common/Heading";
import "./Services.css";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {

  const { isAdmin, auth, isManager } = useAuth();
  const guestId = auth?.user?.id;

  const [requestType, setRequestType] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [media, setMedia] = useState(null);
  // const [status, setStatus] = useState("Request received");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [requests, setRequests] = useState([]);

  const amenityPrices = {
    "Extra Towels": 5.0, // Replace with actual prices
    Toiletries: 3.0,
    Robes: 8.0,
    Slippers: 4.0,
    Other: 0.0,
  };


  const handleRequestSubmission = async () => {

    // const totalPrice = amenityPrices[selectedAmenity];
    // // You can update the status with the total price.
    // setStatus(`In progress. Total Price: $${totalPrice}`);

    try {
      let response = await axios.post(`/api/v1/service/makeroomservice`, {
        serviceType: requestType,
        guestId: guestId,
        rnumber: selectedRoom,
        spInstruct: specialInstructions
      });

      if (response && response.data.success) {
        console.log("Room service made successfully", response.data);
      } else {
        console.log("error");
      }

    } catch (error) {
      console.error("Error making room service Request:", error);
    }
  };


  useEffect(() => {
    const fetchServices = async (setter1, setter2) => {
      try {
        const guestId = auth?.user?.id;

        const response = await axios.get(`/api/v1/room/fetchcheckedinrooms`, {
          params: { guestId },
        });
        if (response.data.success) {
          const roomNumbers = response.data.services.map(service => service.rnumber);
          setter1(roomNumbers);
        }

        const response1 = await axios.get(`/api/v1/service/fetchrequestedroomservice`, {
          params: { guestId },
        });
        if (response1.data.success) {
          const req = response1.data.services;
          setter2(req);
        }


      } catch (err) {
        console.error(err.message);
      }
    };

    fetchServices(setRooms, setRequests);
  }, [auth]);




  return (
    <>
      <section className="services mb">
        <Back name="Services" title="All Sevices & Facilitites" cover={img} />
        {(auth.user && !isAdmin && !isManager) ? (
          <>
            <div className="container reqservices">
              <Container maxWidth="sm">
                <Heading title="Request Services" />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Select Room</InputLabel>
                  <Select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    label="Select Room"
                  >
                    {rooms.map((room, index) => (
                      <MenuItem key={index} value={room}>
                        Room No : {room}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Request Type</InputLabel>
                  <Select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    label="Request Type"
                  >
                    <MenuItem value="">Select...</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    <MenuItem value="Room Service">Room Service</MenuItem>
                    <MenuItem value="Extra Amenities">Extra Amenities</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                {requestType === "Extra Amenities" && (
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Select Amenity</InputLabel>
                    <Select
                      value={selectedAmenity}
                      onChange={(e) => setSelectedAmenity(e.target.value)}
                      label="Select Amenity"
                    >
                      {Object.keys(amenityPrices).map((amenity) => (
                        <MenuItem key={amenity} value={amenity}>
                          {amenity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  fullWidth
                  label="Special Instructions"
                  variant="outlined"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  margin="normal"
                />
                <div className="btncontainer">
                  <input
                    type="file"
                    id="media-upload"
                    style={{ display: "none" }}
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                  <label htmlFor="media-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Attach Media
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRequestSubmission}
                    disabled={
                      !requestType
                    }
                  >
                    Submit Request
                  </Button>
                </div>
              </Container>
            </div>
            <div className="container reqservices">
              <Container maxWidth="sm">
                <Heading title="Services Records" />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>SI</TableCell>
                        <TableCell>Room Id</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requests.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{entry.rnumber}</TableCell>
                          <TableCell>{entry.servicetype}</TableCell>
                          <TableCell>{entry.status}</TableCell>
                          <TableCell>
                            {entry.status === 'Done' && <Button
                              className='rmbtn'
                              variant="contained"
                              component={Link}
                              size="small"
                              style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                            >Review</Button>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </div></>
        ) : (
          <div className="featured container">
            <FeaturedCard />
            <FeaturedCard />
          </div>
        )}
      </section>
    </>
  );
};

export default Services;
