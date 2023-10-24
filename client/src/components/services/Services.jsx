import React from "react";
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
import RecentCard from "../home/recent/RecentCard";

const Services = () => {
  const [requestType, setRequestType] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [media, setMedia] = useState(null);
  const [status, setStatus] = useState("Request received");

  const amenityPrices = {
    "Extra Towels": 5.0, // Replace with actual prices
    Toiletries: 3.0,
    Robes: 8.0,
    Slippers: 4.0,
    Other: 0.0,
  };

  const serviceHistory = [
    {
      service: 'Maintenance',
      status: 'Completed',
    },
    {
      service: 'Room Service',
      status: 'In progress',
    },
    {
      service: 'Extra Amenities',
      status: 'Completed',
    },
  ];

  const handleRequestSubmission = () => {
    // Handle the request submission here, including calculating the total price.

    const totalPrice = amenityPrices[selectedAmenity];
    // You can update the status with the total price.
    setStatus(`In progress. Total Price: $${totalPrice}`);
  };

  const { isAdmin, auth, isManager } = useAuth();

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
                        <TableCell>Service</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serviceHistory.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{entry.service}</TableCell>
                          <TableCell>{entry.status}</TableCell>
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
