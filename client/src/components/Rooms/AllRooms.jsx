import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { AddRoomForm } from "./AddRoomForm";
import axios from "axios";
import ViewRoom from "./ViewRoom";
import { Snackbar, Alert } from "@mui/material";
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export const AllRooms = () => {

    const { isManager } = useAuth();
    const [openViews, setOpenViews] = useState({});
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [roomToEdit, setRoomToEdit] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchText, setSearchText] = useState('');


    const handleCloseView = (rnumber) => {
        setOpenViews((prevOpenViews) => ({ ...prevOpenViews, [rnumber]: false }));
    };

    const handleSnackbar = (message, severity) => {
        setSnackbarOpen(true);
        setSnackbarSeverity(severity); // Add severity level
        setSnackbarMessage(message);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    // Usage example for successful room addition:
    const handleRoomAdded = (newRoom) => {
        setRooms((prevRooms) => [...prevRooms, newRoom]);
        handleSnackbar('Room added/Updated successfully');
    };

    const handleEdit = (room) => {
        setRoomToEdit(room);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRoomToEdit(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/room/fetchrooms');
                if (response) {
                    const jsonData = response.data.rooms;
                    setRooms(jsonData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (rnum) => {
        try {
            const response = await axios.delete(`/api/v1/room/deleteroom/${rnum}`);
            if (response.data.success) {
                setRooms((prevRooms) => prevRooms.filter((room) => room.rnumber !== rnum));
                handleSnackbar('Room deleted successfully', 'success');
            }
        } catch (err) {
            console.error(err.message);
            handleSnackbar('Error deleting room', 'error');
        }
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredRooms = rooms.filter((room) =>
        room.rtype.toLowerCase().includes(searchText.toLowerCase()) ||
        room.rnumber.toLowerCase().includes(searchText.toLowerCase()) ||
        room.rate.toString().includes(searchText)
    );


    return (
        <div>
            <div
                className="heading"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    variant="h5"
                    style={{
                        textAlign: "center",
                        margin: "20px 40px",
                        color: "var(--textColor)",
                    }}
                >
                    Rooms Lists
                </Typography>
                {isManager ? (
                    <Typography style={{ textAlign: "center", margin: "20px 40px" }}>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            onClick={() => {
                                setOpen(true);
                                setRoomToEdit(null);
                            }}
                            style={{
                                background: "#2a9942",
                                margin: "5px",
                                color: "white",
                                fontSize: "10px",
                            }}
                        >
                            Add Room
                        </Button>
                        <AddRoomForm
                            open={open}
                            handleClose={handleClose}
                            onRoomAdded={handleRoomAdded}
                            roomToEdit={roomToEdit}
                        />
                    </Typography>
                ) : (
                    ""
                )}
            </div>
            <TextField
                label="Search..."
                variant="outlined"
                value={searchText}
                onChange={handleSearch}
                style={{
                    marginBottom: '20px',
                    marginLeft: '20px',
                    width: '300px',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {filteredRooms.length !== 0 ? (
                <>
                    <div className="table" style={{ padding: "20px" }}>
                        <TableContainer
                            component={Paper}
                            style={{ background: "var(--bg1)" }}
                        >
                            <Table aria-label="simple table">
                                <TableHead className="tablehead">
                                    <TableRow>
                                        <TableCell
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="left"
                                        >
                                            SI
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="left"
                                        >
                                            Room
                                        </TableCell>
                                        <TableCell
                                            className="mobile"
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="center"
                                        >
                                            Room No
                                        </TableCell>
                                        <TableCell
                                            className="mobile"
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="center"
                                        >
                                            Occupancy
                                        </TableCell>
                                        {window.innerWidth >= 1050 && (
                                            <>
                                                <TableCell
                                                    style={{
                                                        fontSize: "16px",
                                                        color: "var(--textColor)",
                                                    }}
                                                    align="center"
                                                >
                                                    Rate
                                                </TableCell>
                                            </>
                                        )}
                                        <TableCell
                                            className="minitablet"
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="center"
                                        >
                                            Status
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: "16px", color: "var(--textColor)" }}
                                            align="center"
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRooms.map((room, index) => (
                                        <TableRow
                                            key={room?.rnumber}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell
                                                style={{ fontSize: "12px", color: "var(--textColor)" }}
                                                align="left"
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="center"
                                                style={{ fontSize: "12px", color: "var(--textColor)" }}
                                            >
                                                {
                                                    <div className="room">
                                                        <img
                                                            src={`/images/rooms/${room?.pic}.jpg`}
                                                            alt=""
                                                        />
                                                        <span>{room?.rtype}</span>
                                                    </div>
                                                }
                                            </TableCell>
                                            <TableCell
                                                className="mobile"
                                                style={{ fontSize: "12px", color: "var(--textColor)" }}
                                                align="center"
                                            >
                                                {room.rnumber}
                                            </TableCell>
                                            <TableCell
                                                className="mobile"
                                                style={{ fontSize: "12px", color: "var(--textColor)" }}
                                                align="center"
                                            >
                                                {room.occupancy}
                                            </TableCell>
                                            {window.innerWidth >= 1050 && (
                                                <>
                                                    <TableCell
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "var(--textColor)",
                                                        }}
                                                        align="center"
                                                    >
                                                        {room.rate}
                                                    </TableCell>
                                                </>
                                            )}
                                            <TableCell
                                                className="minitablet"
                                                style={{ fontSize: "12px", color: "var(--textColor)" }}
                                                align="center"
                                            ></TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    size="small"
                                                    style={{
                                                        background: "#2a9942",
                                                        margin: "1px",
                                                        fontSize: "10px",
                                                    }}
                                                    onClick={() => {
                                                        setOpenViews((prevOpenViews) => ({
                                                            ...prevOpenViews,
                                                            [room.rnumber]: true,
                                                        }));
                                                    }}
                                                    state={room}
                                                >
                                                    View
                                                </Button>
                                                <ViewRoom
                                                    openView={openViews[room.rnumber] || false}
                                                    handleCloseView={() => handleCloseView(room.rnumber)}
                                                    room={room}
                                                    handleEdit={handleEdit}
                                                />
                                                {isManager && (
                                                    <>
                                                        <Button
                                                            className="rmbtn"
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            style={{
                                                                background: "#754ef9",
                                                                margin: "1px",
                                                                fontSize: "10px",
                                                            }}
                                                            onClick={() => handleEdit(room)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            className="rmbtn"
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            style={{
                                                                background: "red",
                                                                margin: "1px",
                                                                fontSize: "10px",
                                                            }}
                                                            onClick={() => handleDelete(room.rnumber)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            ) : (
                ""
            )
            }
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    );
};
