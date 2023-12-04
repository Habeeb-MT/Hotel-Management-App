import "./TableMini.scss"
import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import { Typography } from '@mui/material';
export const TableMini = () => {
    const [serviceList, setServiceList] = useState([])
    const { auth } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/room/fetchreserve/`);
                if (response && response.data && response.data.services) {
                    const jsonData = response.data.services;
                    setServiceList(jsonData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    const acceptBooking = async (reserveId) => {
        try {
            // Make a PUT request to update service status to "Booked"
            const response = await axios.put(`/api/v1/room/acceptBooking`, { reserveId });

            if (response && response.data && response.data.success) {
                // Update serviceList to reflect the changes in UI
                setServiceList((prevServiceList) => prevServiceList.filter((service) => service.reserveId === reserveId));
            }
        } catch (error) {
            console.error("Error accepting booking:", error);
            // Handle error scenario, display an error message or take appropriate action
        }
    };

    const rejectBooking = async (reserveId) => {
        try {
            const response = await axios.put(`/api/v1/room/rejectBooking`, { reserveId });

            if (response && response.data && response.data.success) {
                // Remove the cancelled service from the booked list
                setServiceList(prev => prev.filter(service => service.reserveid !== reserveId));
            }
        } catch (error) {
            console.error("Error rejecting booking:", error);
            // Handle error scenario, display an error message or take appropriate action
        }
    };


    return (
        <div>
            <>
                <div className='table' style={{ padding: "20px" }}>
                    <TableContainer component={Paper} style={{ background: "var(--bg1)" }} >

                        <Typography variant='h5' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)", textDecoration: "underline" }}>Reservations</Typography>
                        <Table aria-label="simple table">
                            {serviceList.length > 0 ?
                                <>
                                    <TableHead className='tablehead'>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">SI</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Guest-ID</TableCell>
                                            <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Room No</TableCell>
                                            <TableCell className='mobile' style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Date</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {serviceList.map((service, index) => (
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row" align='center' style={{ fontSize: "12px", color: "var(--textColor)" }}>{service.guestid}</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{service?.rnumber}</TableCell>
                                                <TableCell className='mobile' style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{service?.startdate?.slice(0, 10)} - {service?.enddate?.slice(0, 10)}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        className='rmbtn'
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                        onClick={() => acceptBooking(service.reserveid)}
                                                    >Accept</Button>
                                                    <Button
                                                        className='rmbtn'
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                        onClick={() => rejectBooking(service.reserveid)}
                                                    >Reject</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>
                                </> :
                                <Typography variant='h6' style={{ textAlign: "center", margin: "20px 40px", color: "var(--textColor)" }}>No Booking Request Pending!</Typography>
                            }
                        </Table>
                    </TableContainer>
                </div>


            </>

        </div>
    );
};
