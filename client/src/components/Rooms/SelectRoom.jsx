import React, { useContext } from 'react'
import "./BooksRooms.css"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export const SelectRoom = () => {
    const { isAdmin } = useContext(UserContext);

    const roomList = [
        {
            name: "Super Deluxe Suite",
            img: "",
            occupancy: 2,
            area: "200 sqft",
        },
    ];

    return (
        <section className='padding1'>
            <div className='container'>
                <div>
                    <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)" }}>Rooms Lists</Typography>
                    </div>
                    {roomList.length !== 0 &&
                        <>
                            <div className='table' style={{ padding: "20px" }}>
                                <TableContainer component={Paper} style={{ background: "var(--bg1)" }} >
                                    <Table aria-label="simple table">
                                        <TableHead className='tablehead'>
                                            <TableRow>
                                                <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center" rowSpan={roomList.length * 3}>Room Type</TableCell>
                                                <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Options</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {roomList.map((room, index) => (
                                                <React.Fragment key={index}>
                                                    <TableRow>
                                                        <TableCell rowSpan={3} component="th" scope="row" align='center' style={{ fontSize: "16px", color: "var(--textColor)" }}>
                                                            <div className='user'>
                                                                <img src={room.img} alt="" />
                                                                <span>{room.name}</span></div>
                                                        </TableCell>
                                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">{
                                                            <>
                                                                Room Only
                                                                <ul>
                                                                    <li>Non-Refundable</li>
                                                                    <li>No meals included</li>
                                                                    <li>Free Welcome Drink on Arrival</li>
                                                                </ul></>
                                                        }</TableCell>
                                                        <TableCell align="center">
                                                            <>
                                                                <div>
                                                                    &#8377;2999 /Night
                                                                </div>
                                                                <Button
                                                                    variant="contained"
                                                                    component={Link}
                                                                    size="small"
                                                                    style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                                    onClick={() => {
                                                                        // Handle booking "Room Only"
                                                                    }}
                                                                >Book Now</Button>
                                                            </>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">{
                                                            <>
                                                                Room + Breakfast
                                                                <ul>
                                                                    <li>Non-Refundable</li>
                                                                    <li>No meals included</li>
                                                                    <li>Free Welcome Drink on Arrival</li>
                                                                </ul></>
                                                        }</TableCell>
                                                        <TableCell align="center">
                                                            <>
                                                                <div>
                                                                    &#8377;2999 /Night
                                                                </div>
                                                                <Button
                                                                    variant="contained"
                                                                    component={Link}
                                                                    size="small"
                                                                    style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                                    onClick={() => {
                                                                        // Handle booking "Room Only"
                                                                    }}
                                                                >Book Now</Button>
                                                            </>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">{
                                                            <>
                                                                Room + Breakfast + lunch/dinner
                                                                <ul>
                                                                    <li>Non-Refundable</li>
                                                                    <li>No meals included</li>
                                                                    <li>Free Welcome Drink on Arrival</li>
                                                                </ul></>
                                                        }</TableCell>
                                                        <TableCell align="center">
                                                            <>
                                                                <div>
                                                                    &#8377;2999 /Night
                                                                </div>
                                                                <Button
                                                                    variant="contained"
                                                                    component={Link}
                                                                    size="small"
                                                                    style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                                    onClick={() => {
                                                                        // Handle booking "Room Only"
                                                                    }}
                                                                >Book Now</Button>
                                                            </>
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </>
                    }
                    <div className='common-part'>
                        <div className="common-section">
                            <div className="common-container">
                                <Typography variant="h6" style={{ marginBottom: 10 }}>Property Rules</Typography>
                                <ul>
                                    <li>No smoking/liquor allowed.</li>
                                    <li>Pets are not allowed.</li>
                                    <li>Check-in time: From 12:00 to 19:00</li>
                                    <li>Check-out time: Available 24 hours</li>
                                </ul>
                            </div>
                        </div>

                        <div className="common-section">
                            <div className="common-container">
                                <Typography variant="h6" style={{ marginBottom: 10 }}>Refund Policy</Typography>
                                <ul>
                                    <li>Advance is non refundable</li>
                                    <li>Parking available</li>
                                    <li>24/7 Front Desk</li>
                                    <li>Swimming pool</li>
                                </ul>
                            </div>
                        </div>

                        <div className="common-section">
                            <div className="common-container">
                                <Typography variant="h6" style={{ marginBottom: 10 }}>Common Facilities</Typography>
                                <ul>
                                    <li>Free Wi-Fi</li>
                                    <li>Parking available</li>
                                    <li>24/7 Front Desk</li>
                                    <li>Swimming pool</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
