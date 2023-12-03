import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { InvoiceDialog } from "../Report/Invoice";
import axios from "axios";
import { useAuth } from "../../contexts/auth";


export const MyBookings = () => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [selectedCategory, setSelectedCategory] = useState("booked");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const [openInvoice, setOpenInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});



    const handleOpenInvoice = async (reserveId) => {
        const roomDetails = getRoomDetailsForService(reserveId);

        if (roomDetails) {
            console.log(reserveId)
            try {
                const response = await axios.get(`/api/v1/invoice/fetchinvoice/${reserveId}`);
                if (response.data.success) {
                    setInvoiceData({ invoice: response.data.invoice, roomDetails: roomDetails });
                    setOpenInvoice(true);
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    };


    const handleCloseInvoice = () => {
        setOpenInvoice(false);
    };

    const [bookedServices, setBookedServices] = useState([]);
    const [completedServices, setCompletedServices] = useState([]);
    const [cancelledServices, setCancelledServices] = useState([]);

    useEffect(() => {
        const fetchServices = async (serviceType, setter) => {
            try {
                const guestId = auth?.user?.id;

                const response = await axios.get(`/api/v1/room/getMyService/${serviceType}`, {
                    params: { guestId },
                });
                if (response.data.success) {
                    setter(response.data.services);
                }
            } catch (err) {
                console.error(err.message);
            }
        };


        fetchServices('booked', setBookedServices);
        fetchServices('completed', setCompletedServices);
        fetchServices('cancelled', setCancelledServices);
    }, []);

    const getServiceListForCategory = () => {
        switch (selectedCategory) {
            case 'booked':
                return bookedServices;
            case 'completed':
                return completedServices;
            case 'cancelled':
                return cancelledServices;
            default:
                return [];
        }
    };

    const getRoomDetailsForService = (serviceId) => {
        let serviceList = [];

        switch (selectedCategory) {
            case 'booked':
                serviceList = bookedServices;
                break;
            case 'completed':
                serviceList = completedServices;
                break;
            case 'cancelled':
                serviceList = cancelledServices;
                break;
            default:
                break;
        }

        // Ensure serviceList is an array before using find
        if (Array.isArray(serviceList) && serviceList.length > 0) {
            const service = serviceList.find(service => service.reserveid === serviceId);

            return service;
        }
        return null;
    };


    const list = getServiceListForCategory();

    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const [selectedReserveId, setselectedReserveId] = useState(null);

    // Function to open the cancel confirmation dialog
    const handleCancelConfirmationOpen = (serviceId) => {
        setselectedReserveId(serviceId);
        setCancelConfirmationOpen(true);
    };

    // Function to close the cancel confirmation dialog
    const handleCancelConfirmationClose = () => {
        setCancelConfirmationOpen(false);
    };

    const cancelBooking = async () => {
        try {
            const response = await axios.put(`/api/v1/room/cancelBooking`, { reserveId: selectedReserveId });

            if (response && response.data && response.data.success) {
                // Update the UI or perform additional actions after successful cancellation
                const updatedCancelledService = bookedServices.find(service => service.reserveid === selectedReserveId);
                setCancelledServices(prevCancelledServices => [...prevCancelledServices, updatedCancelledService]);

                // Remove the cancelled service from the booked list
                setBookedServices(prevBookedServices => prevBookedServices.filter(service => service.reserveid !== selectedReserveId));
            }
            // Close the cancel confirmation dialog after handling cancellation
            handleCancelConfirmationClose();
        } catch (error) {
            console.error("Error cancelling booking:", error);
            // Handle error scenario, display an error message or take appropriate action
        }
    };

    const handleCheckIn = async (reserveId) => {
        try {
            const response = await axios.put(`/api/v1/room/checkin`, { reserveId });

            if (response && response.data && response.data.success) {

                // Remove the cancelled service from the booked list
                // console.log(response)
                setBookedServices(prevBookedServices => prevBookedServices.filter(service => service.reserveId !== reserveId));

                navigate("/about")
            }
        } catch (error) {
            console.error("Error check-in room:", error);
            // Handle error scenario, display an error message or take appropriate action
        }
    };

    const handleCheckOut = async (reserveId) => {
        try {
            const response = await axios.put(`/api/v1/room/checkout`, { reserveId });

            if (response && response.data && response.data.success) {
                const updatedCompletedService = bookedServices.find(service => service.reserveid === selectedReserveId);
                setCompletedServices(prevCompletedServices => [...prevCompletedServices, updatedCompletedService]);

                // Remove the cancelled service from the booked list
                setBookedServices(prevBookedServices => prevBookedServices.filter(service => service.reserveid !== reserveId));
            }
        } catch (error) {
            console.error("Error check-in room:", error);
            // Handle error scenario, display an error message or take appropriate action
        }
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Ensure leading zero for single digit month/day
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    return (
        <section className="paddingmyBk">
            <div className='containermyBk'>
                <div className="centrebox" id="booked">
                    <ul className={"flex"}>
                        {["booked", "completed", "cancelled"].map((category, index) => (
                            <li key={index} onClick={() => handleCategoryChange(category)}>
                                <Link to={`#${category}`} style={{ textDecoration: selectedCategory === category ? "underline" : "none" }}>
                                    <Typography variant='h6' style={{ textAlign: "center", color: "var(--textColor)" }}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {list.length > 0 ? (
                        <div className='table' style={{ padding: "20px" }}>
                            <TableContainer component={Paper} style={{ background: "var(--bg1)" }}>
                                <Table aria-label="simple table">
                                    <TableHead className='tablehead'>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">SI</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Room No</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Date</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map((item, index) => (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'>{index + 1}</TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="left">{item.rnumber}</TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">8-12-2023
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div>
                                                        {selectedCategory === 'booked' && (
                                                            <>
                                                                {item.status === "CheckedIn" ? (
                                                                    <Button
                                                                        className='rmbtn'
                                                                        variant="contained"
                                                                        component={Link}
                                                                        size="small"
                                                                        style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                                        onClick={() => handleCheckOut(item.reserveid)}
                                                                    >Check-Out
                                                                    </Button>
                                                                ) : (
                                                                    <>
                                                                        <Button
                                                                            className='rmbtn'
                                                                            variant="contained"
                                                                            component={Link}
                                                                            size="small"
                                                                            style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                                            onClick={() => handleCheckIn(item.reserveid)}
                                                                        >Check-In
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleCancelConfirmationOpen(item.reserveid)} // Open the cancel confirmation dialog
                                                                            className='rmbtn'
                                                                            variant="contained"
                                                                            component={Link}
                                                                            size="small"
                                                                            style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        {selectedCategory === 'completed' && (
                                                            <Button
                                                                className='rmbtn'
                                                                variant="contained"
                                                                component={Link}
                                                                size="small"
                                                                style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                            >Review
                                                            </Button>
                                                        )}
                                                        <Button
                                                            className='rmbtn'
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => handleOpenInvoice(item.reserveid)}
                                                            style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                        >
                                                            Invoice
                                                        </Button>
                                                        <InvoiceDialog
                                                            open={openInvoice}
                                                            onClose={handleCloseInvoice}
                                                            invoiceData={invoiceData}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={cancelConfirmationOpen}
                                        onClose={handleCancelConfirmationClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">
                                            {"Are you sure you want to cancel the booking?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                The advance amount paid is non-refundable
                                            </DialogContentText>
                                            <DialogContentText>
                                                Contact us for any queries.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleCancelConfirmationClose} style={{ color: "#754ef9" }}>
                                                No
                                            </Button>
                                            <Button onClick={cancelBooking} autoFocus style={{ color: "red" }}>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <Typography variant='h6' style={{ textAlign: "center", color: "var(--textColor)", marginTop: "30px" }}>No {selectedCategory} items found!</Typography>
                    )}
                </div>
            </div>
        </section>
    );
};
