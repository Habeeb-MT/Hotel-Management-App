import React, { useState } from "react"
import "./Dashboard.scss"
import { Link } from "react-router-dom"
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const MyBookings = () => {

    const nav = [
        {
            text: "Booked",
            path: "#booked",
        },
        {
            text: "Completed",
            path: "#completed",
        },
        {
            text: "Cancelled",
            path: "#cancelled",
        },
    ]

    const list = [
        {
            name: "Suite Room",
            date: "12/10/2020 - 15/10/2020",
        }
    ];

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <section className="padding2">
            <div className='container'>
                <header className="header">
                    <div className='nav'>
                        <ul className={"flex"}>
                            {nav.map((list, index) => (
                                <li key={index}>
                                    <Link to={list.path}>{list.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>

                <div className="centrebox" id="booked">
                    <h3>Booked</h3>
                    {list.map((lst, index) => (
                        <div className="boxcontent">
                            <span>{index + 1}</span>
                            <span>{lst.name}</span>
                            <span>{lst.date}</span>
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
                            </Button>
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
                                        The advance amount payed is non-refundable
                                    </DialogContentText>
                                    <DialogContentText>
                                        Conatact Us for any queries.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        No
                                    </Button>
                                    <Button onClick={handleClose} autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    ))}
                </div>

                <div className="centrebox" id="completed">
                    <h3>Completed</h3>
                    {list.map((lst, index) => (
                        <div className="boxcontent">
                            <span>{index + 1}</span>
                            <span>{lst.name}</span>
                            <span>{lst.date}</span>
                            <Button
                                className='rmbtn'
                                variant="contained"
                                component={Link}
                                size="small"
                                style={{ background: "#754ef9", margin: "1px", fontSize: "10px" }}
                            >Review</Button>

                        </div>
                    ))}
                </div>

                <div className="centrebox" id="cancelled">
                    <h3>Cancelled</h3>
                    {list.map((lst, index) => (
                        <div className="boxcontent">
                            <span>{index + 1}</span>
                            <span>{lst.name}</span>
                            <span>{lst.date}</span>


                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}
