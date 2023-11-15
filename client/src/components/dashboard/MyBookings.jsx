import React, { useState } from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export const MyBookings = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("booked");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bookedList = [
        {
            name: "Suite Room",
            date: "12/10/2020 - 15/10/2020",
        },
        // Add more booked items as needed
    ];

    const completedList = [
        {
            name: "Deluxe Room",
            date: "15/10/2020 - 18/10/2020",
        },
        // Add more completed items as needed
    ];

    const cancelledList = [
        {
            name: "Standard Room",
            date: "18/10/2020 - 20/10/2020",
        },
        // Add more cancelled items as needed
    ];

    const getListForCategory = () => {
        switch (selectedCategory) {
            case "booked":
                return bookedList;
            case "completed":
                return completedList;
            case "cancelled":
                return cancelledList;
            default:
                return [];
        }
    };

    const list = getListForCategory();

    return (
        <section className="paddingmyBk">
            <div className='containermyBk'>
                <div className="centrebox" id="booked">
                    {list.length > 0 ? (
                        <div className='table' style={{ padding: "20px" }}>
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
                            <TableContainer component={Paper} style={{ background: "var(--bg1)" }}>
                                <Table aria-label="simple table">
                                    <TableHead className='tablehead'>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">SI</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="left">Name</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Date</TableCell>
                                            <TableCell style={{ fontSize: "16px", color: "var(--textColor)" }} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map((item, index) => (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align='center'>{index + 1}</TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="left">{item.name}</TableCell>
                                                <TableCell style={{ fontSize: "12px", color: "var(--textColor)" }} align="center">{item.date}</TableCell>
                                                <TableCell align="center">
                                                    <div>
                                                        {selectedCategory === 'booked' && (
                                                            <>
                                                                <Button
                                                                    className='rmbtn'
                                                                    variant="contained"
                                                                    component={Link}
                                                                    size="small"
                                                                    style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                                                                >Check-In
                                                                </Button>
                                                                <Button
                                                                    onClick={handleClickOpen}
                                                                    className='rmbtn'
                                                                    variant="contained"
                                                                    component={Link}
                                                                    size="small"
                                                                    style={{ background: "red", margin: "1px", fontSize: "10px" }}
                                                                >Cancel
                                                                </Button></>
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
                                                            component={Link}
                                                            size="small"
                                                            style={{ background: "#2a9942", margin: "1px", fontSize: "10px" }}
                                                        >Invoice
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
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
                                            <Button autoFocus onClick={handleClose} style={{ color: "#754ef9" }}>
                                                No
                                            </Button>
                                            <Button onClick={handleClose} autoFocus style={{ color: "red" }}>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <Typography variant='h5' style={{ textAlign: "center", color: "var(--textColor)" }}>No {selectedCategory} items found!</Typography>
                    )}
                </div>
            </div>
        </section>
    );
};
